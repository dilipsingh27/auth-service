const userServices = require('../src/services/user.service');
const { Users } = require("../src/models");

describe("User Services", () => {
  describe("POST /register", () => {
    it("should register a user", async () => {
      const mockResult = {
        name: "test",
        password: "12345678",
      };
      jest.spyOn(Users, "create").mockResolvedValue(mockResult);
      const result = await userServices.createUser(mockResult);
      expect(result).toEqual(mockResult);
    });

  });

  describe("POST /login", () => {
    it("should login a user", async () => {
      const mockResult = {
        dataValues: {
          id: "1",
        },
        email: "test",
        password: "123456",
      };

      const token =
        "eyJhbGciOiJIUzI1NiJ9.dGVzdA.Z9QppyGaeY_EPcKk_srfzkntr319UZd97HOhhOmjEcc";
      jest.spyOn(Users, "findOne").mockResolvedValue(mockResult);
      const result = await userServices.loginUser(mockResult);
      expect(result).toEqual(token);
    });

    it("should not login a user when password is null", async () => {

      // jest.spyOn(Users, "findOne").mockImplementation(() => {
      //   throw new Error("User not found");
      // });

      // const result = await userServices.login("abc");

      // expect(result).toEqual("User not found");

      jest.spyOn(Users, "findOne").mockResolvedValue(null);
      await expect(userServices.loginUser("dilip")).rejects.toThrow(Error("res is not defined"));

    });

    it("should not login a user when password is invalid", async () => {

          jest.spyOn(Users, "findOne").mockResolvedValue({
            dataValues: {
              id: "1",
            },
            name: "test",
            password: "123456",
          });

          const mockResult = {
            dataValues: {
              id: "1",
            },
            name: "test",
            password: "890876",
          }

          await expect(userServices.loginUser(mockResult)).rejects.toThrow(Error("res is not defined"));

    });
  });
});