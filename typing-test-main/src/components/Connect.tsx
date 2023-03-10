import React, { useState } from 'react';
import { Client } from 'pg';

function InsertRecord() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState('');

  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'mydatabase',
    user: 'myuser',
    password: 'mypassword'
  });

  async function handleSubmit(event) {
    event.preventDefault();

    await client.connect();

    const query = {
      text: 'INSERT INTO users (name, age) VALUES ($1, $2)',
      values: [name, age]
    };

    try {
      const res = await client.query(query);
      setResult(`Inserted ${res.rowCount} row(s)`);
    } catch (err) {
      setResult(`Error: ${err.message}`);
    } finally {
      await client.end();
    }
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleAgeChange(event) {
    setAge(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name-input">Name:</label>
        <input id="name-input" type="text" value={name} onChange={handleNameChange} />
        <label htmlFor="age-input">Age:</label>
        <input id="age-input" type="text" value={age} onChange={handleAgeChange} />
        <button type="submit">Insert</button>
      </form>
      <p>{result}</p>
    </div>
  );
}

export default InsertRecord;