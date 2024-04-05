const { registerUser } = require('.//auht'); 

describe('registerUser function', () => {
  it('should return error if username contains special characters', async () => {
    // Arrange
    const username = 'user@name'; 
    
    // Act
    const result = await registerUser(username, 'password');
    
    // Assert
    expect(result.success).toBe(false); 
    expect(result.message).toMatch(/Invalid username/);
  });
});
