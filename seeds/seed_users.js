export const seed = async (knex) => {
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password_digested: 'hashed_password_1',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@example.com',
      password_digested: 'hashed_password_2',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      first_name: 'Bob',
      last_name: 'Johnson',
      email: 'bob.johnson@example.com',
      password_digested: 'hashed_password_3',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
