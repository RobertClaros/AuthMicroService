const { registerUser } = require('./auht');

describe('registerUser function', () => {
  it('should return error if username contains special characters', async () => {
    const result = await registerUser('user@name', 'password');
    expect(result.success).toBe(false);
    expect(result.message).toBe('Invalid username');
  });
});
