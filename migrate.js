import sqlite3 from 'sqlite3'

// Open a connection to the SQLite database
const db = new sqlite3.Database('./xbharat.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  console.log('Connected to the SQLite database.');
});
// Enable foreign key constraints
db.run('PRAGMA foreign_keys = ON;', (err) => {
    if (err) {
      console.error('Error enabling foreign keys:', err.message);
      return;
    }
    console.log('Foreign keys enabled.');
  });

// Step 1: Create a new table with the updated column type (STRING to TEXT)
db.serialize(() => {
  // Create a new table with the desired TEXT type (assuming `column_name` was of type STRING)       
  db.run('CREATE TABLE IF NOT EXISTS nposts (' +
         'id INTEGER PRIMARY KEY, ' +
         'content TEXT, ' +
         'views INTEGER,'+
         'deleted BOOLEAN,'+
         'mediatype STRING,'+
         'media TEXT,'+
         'parentpostid INTEGER,'+
         'UserId INTEGER,'+
         'createdAt DATE,'+
         'updatedAt DATE,'+
         'FOREIGN KEY (parentpostid) REFERENCES nposts(id),'+
         'FOREIGN KEY (UserId) REFERENCES Users(id)'+
         ')', (err) => {  // The new column with the correct TEXT type
    if (err) {
      console.error('Error creating new table:', err.message);
      return;
    }
    console.log('Created new table with TEXT column type.');
  });

  // Step 2: Copy data from the old table to the new table
  db.run('INSERT INTO nposts (id, content, views, deleted, mediatype, media, parentpostid, UserId, createdAt, updatedAt) ' +
         'SELECT id, content, views, deleted, mediatype, media, parentpostid, UserId, createdAt, updatedAt FROM Posts', (err) => {
    if (err) {
      console.error('Error copying data:', err.message);
      return;
    }
    console.log('Data copied to the new table.');
  });

  // Step 3: Drop the old table
  db.run('DROP TABLE IF EXISTS Posts', (err) => {
    if (err) {
      console.error('Error dropping old table:', err.message);
      return;
    }
    console.log('Dropped the old table.');
  });

  // Step 4: Rename the new table to the old table name
  db.run('ALTER TABLE nposts RENAME TO Posts', (err) => {
    if (err) {
      console.error('Error renaming new table:', err.message);
      return;
    }
    console.log('Renamed the new table to the old table name.');
  });
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error('Error closing the database:', err.message);
  } else {
    console.log('Database connection closed.');
  }
});
