import { Test, TestingModule } from "@nestjs/testing"
import { RegisterMemberController } from "./controller/register-member.controller"

describe("RegisterMemberController", () => {
    let controller: RegisterMemberController;
    beforeEach(async()=> {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RegisterMemberController],
        }).compile();
        controller = module.get<RegisterMemberController>(RegisterMemberController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
