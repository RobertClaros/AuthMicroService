const { registerUser } = require('.//auht'); 
afterAll(async () => {
  await client.close();
});
describe('registerUser function', () => {
  it('should return error if username contains special characters', async () => {
    const username = 'user@name'; 
    const result = await registerUser(username, 'password');
    
    expect(result.success).toBe(false); 
    expect(result.message).toMatch(/Invalid username/);
  });
});
