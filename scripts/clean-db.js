#!/usr/bin/env node
/**
 * Migration helper - Deletes old database to force recreation with new schema
 */
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const dbPath = path.join(os.homedir(), '.sortoi', 'sortoi.db');

if (fs.existsSync(dbPath)) {
  console.log('🗑️  Removing old database:', dbPath);
  fs.unlinkSync(dbPath);
  console.log('✅ Database removed. Next run will create a fresh database with the new schema.');
} else {
  console.log('ℹ️  No old database found. You\'re good to go!');
}
