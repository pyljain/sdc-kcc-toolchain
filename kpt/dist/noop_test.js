"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kpt_functions_1 = require("kpt-functions");
const noop_1 = require("./noop");
const RUNNER = new kpt_functions_1.TestRunner(noop_1.noop);
describe('noop', () => {
    it('does something', () => __awaiter(void 0, void 0, void 0, function* () {
        // TODO: Populate the input to the function.
        const input = new kpt_functions_1.Configs();
        // TODO: Populate the expected output of the function.
        const expectedOutput = new kpt_functions_1.Configs();
        yield RUNNER.assert(input, expectedOutput);
    }));
});
//# sourceMappingURL=noop_test.js.map