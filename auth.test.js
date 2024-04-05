/* global client */

const { registerUser } = require('./auth');

afterAll(async () => {
  // Cerrar la conexión a MongoDB después de que todas las pruebas hayan finalizado
  await client.close();
});

describe('registerUser function', () => {
  it('should return error if username contains special characters', async () => {
    const result = await registerUser('user@name', 'password');
    expect(result.success).toBe(false);
    expect(result.message).toBe('Invalid username');
  });
});
