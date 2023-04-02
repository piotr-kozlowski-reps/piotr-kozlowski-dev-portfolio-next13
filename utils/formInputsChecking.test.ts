import { checkIfNotEmpty, checkIfIsEmail } from "./formInputsChecking";

describe("formInputsChecking - fn", () => {
  it("checkIfNotEmpty", () => {
    let result = checkIfNotEmpty("%");
    expect(result).toBeTruthy();

    result = checkIfNotEmpty("ZZDCSD");
    expect(result).toBeTruthy();

    result = checkIfNotEmpty("");
    expect(result).toBeFalsy();
  });
});

describe("checkIfIsEmail - fn", () => {
  it("checkIfIsEmail", () => {
    let result = checkIfIsEmail("%");
    expect(result).toBeFalsy();

    result = checkIfIsEmail("ZZDCSD");
    expect(result).toBeFalsy();

    result = checkIfIsEmail("");
    expect(result).toBeFalsy();

    result = checkIfIsEmail("@pkr");
    expect(result).toBeFalsy();

    result = checkIfIsEmail("sadf@pkr");
    expect(result).toBeFalsy();

    result = checkIfIsEmail("sadf@");
    expect(result).toBeFalsy();

    result = checkIfIsEmail("sadf@sdfvs.drewesdfvsd");
    expect(result).toBeTruthy();

    result = checkIfIsEmail("sadf@sdfvs.pl");
    expect(result).toBeTruthy();
  });
});
