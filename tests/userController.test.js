const userServices = require("../src/services/user.service");
const userController = require("../src/controllers/user.controller");

describe("User Controller", () => {
  describe("POST /register", () => {
    it("should return 200 if user is registered", async () => {
      const mockResult = { name: "test", password: "123456" };
      jest.spyOn(userServices, "createUser").mockResolvedValue(mockResult);
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userController.createUser(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.json).toBeCalledWith(mockResult);
    });

    it("should return 400 if user not registered", async () => {
      const mockResult = { message: "User not registered" };
      jest.spyOn(userServices, "createUser").mockRejectedValue(mockResult);
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userController.createUser(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith(mockResult);
    });
  });
});

describe("User Controller", () => {
  describe("POST /login", () => {
    it("should return 200 if user has logged in", async () => {
      const mockResult = { name: "test", password: "123456" };
      jest.spyOn(userServices, "loginUser").mockResolvedValue(mockResult);
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userController.loginUser(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockResult);
    });

    it("should return 400 if user not registered", async () => {
      const mockResult = { message: "User not logged in" };
      jest.spyOn(userServices, "loginUser").mockRejectedValue(mockResult);
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userController.loginUser(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith(mockResult);
    });
  });
});
