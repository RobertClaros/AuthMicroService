const { registerUser } = require('.//auht'); // Ajusta la ruta según tu estructura de archivos

describe('registerUser function', () => {
  it('should return error if username contains special characters', async () => {
    // Arrange
    const username = 'user@name'; // Usuario con caracteres especiales
    
    // Act
    const result = await registerUser(username, 'password');
    
    // Assert
    expect(result.success).toBe(false); // Se espera que la operación falle
    expect(result.message).toMatch(/Invalid username/); // Se espera un mensaje de error relacionado con el nombre de usuario
  });
});
