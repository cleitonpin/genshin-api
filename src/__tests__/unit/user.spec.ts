import { MockUserService } from "../../mocks/UserServiceMock";

let userService: MockUserService;

describe("user service", () => {

	beforeEach(() => {
		userService = new MockUserService();
	})

	it("should create a user", async () => {
		const user = {
			email: "fwafwa",
			password: "fawfwaf",
			username: "fawfwaafwwaf",
			img_url: "fawfwaafwwaf"
		}

		await userService.create(user);

		expect(() => {
			userService.getUsers();
		}).not.toThrow();
	})
})