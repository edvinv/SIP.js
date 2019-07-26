import { UserAgentOptions } from "../../../src/api";
import { URI } from "../../../src/core";
import { connectUserFake, makeUserFake, UserFake } from "../../support/api/user-fake";
import { soon } from "../../support/api/utils";

/**
 * UserAgent Integration Tests
 */

describe("UserAgent Class", () => {
  let alice: UserFake;
  let bob: UserFake;
  let target: URI;

  beforeEach(() => {
    jasmine.clock().install();
    const options: UserAgentOptions = {
      autoStart: false
    };
    alice = makeUserFake("alice", "example.com", "Alice", options);
    bob = makeUserFake("bob", "example.com", "Bob", options);
    connectUserFake(alice, bob);
    return alice.userAgent.start().then(() => bob.userAgent.start());
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    alice.userAgent.stop();
    bob.userAgent.stop();
  });

  describe("Alice exists", () => {
    beforeEach(async () => {
      target = bob.uri;
      await soon();
    });

    it("has a configuration", () => {
      const configuration = alice.userAgent.configuration;
      expect(configuration).toBeDefined();
    });
  });
});
