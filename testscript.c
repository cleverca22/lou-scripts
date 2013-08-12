#include <sqlite3.h>
#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>

/*
 * script developer code, to aid in testing things inside the extension
 * to compile: gcc testscript.c -lsqlite3 -o testscript
 * usage example: ./testscript merc.user.js smart_inject
 * 
 * copies merc.user.js into the sqlite db and forces it to run until the next script update
 */

int main(int argc,char *argv[]) {
	if (argc != 3) {
		printf("usage: %s scriptpath type\n",argv[0]);
		char buffer2[10];
		read(0,buffer2,1);
		return -1;
	}
	FILE *config = fopen("config.txt","r");
	if (!config) {
		printf("error, you need to put the path to lou-log.sqlite in config.txt\n");
		char buffer2[10];
		read(0,buffer2,1);
		return -3;
	}
	char dbpath[1024];
	int size = fread(dbpath,1,1024,config);
	if (size < 10) {
		printf("error, db path '%s' doesnt look valid?\n",dbpath);
		return -3;
	}
	dbpath[size] = 0;
	while (isspace(dbpath[size-1])) {
		size--;
		dbpath[size] = 0;
	}
	fclose(config);
	sqlite3 *db;
	int err = sqlite3_open_v2(dbpath,&db,SQLITE_OPEN_READWRITE,0);
	if (err != SQLITE_OK) {
		printf("sqlite error when opening db %d %s\n",size,dbpath);
		return -2;
	}
	FILE *fh = fopen(argv[1],"r");
	if (!fh) {
		printf("error when opening script\n");
		return -3;
	}
	struct stat info;
	if (stat(argv[1],&info)) {
		printf("error when statting\n");
		return -4;
	}
	char *buffer = malloc(info.st_size);

	int remaining = info.st_size;
	int r;
	int done = 0;
	while (r = fread(buffer + done,1,remaining,fh)) {
		remaining = remaining - r;
		done = done + r;
		if (remaining == 0) break;
	}
	fclose(fh);
	buffer[done] = 0;
	char *query = "INSERT OR REPLACE INTO scripts (name,filename,remote_version,installed,localversion,enabled,code,prio,type) VALUES ('local override',?,'9999',1,'9999',1,?,10,?)";
	sqlite3_stmt *statement;
	err = sqlite3_prepare_v2(db,query,strlen(query),&statement,0);
	if (err != SQLITE_OK) {
		printf("sqlite error\n");
		return -5;
	}
	err = sqlite3_bind_text(statement,1,argv[1],-1,0);
	if (err != SQLITE_OK) {
		printf("sqlite error\n");
		return -6;
	}
	err = sqlite3_bind_text(statement,2,buffer,-1,0);
	if (err != SQLITE_OK) {
		printf("sqlite error\n");
		return -7;
	}
	err = sqlite3_bind_text(statement,3,argv[2],-1,0);
	if (err != SQLITE_OK) {
		printf("sqlite error\n");
		return -11;
	}
	err = sqlite3_step(statement);
	if (err != SQLITE_DONE) {
		printf("sqlite error in step %d\n",err);
		return -8;
	}
	err = sqlite3_finalize(statement);
	if (err != SQLITE_OK) {
		printf("sqlite error\n");
		return -9;
	}
	err = sqlite3_close(db);
	if (err != SQLITE_OK) {
		printf("sqlite error in close, %d\n",err);
		return -10;
	}
	printf("script loaded into sqlite and force enabled, f5 ingame to see its effects\n");
	char buffer2[10];
	read(0,buffer2,1);
	return 0;
}
