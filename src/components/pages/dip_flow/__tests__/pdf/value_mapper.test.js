import ValueMapper from "../../pdf/value_mapper";

describe("Value Mapper TestCase", () => {
  test("should map properly base data", () => {
    const Fields = [
      {
        name: "fake_name",
        label: "Fake Label",
        style: "tableColSmall",
        data_key: "fake",
      },
    ];

    const data = {
      fake: "somefakevalue",
    };

    const mapper = new ValueMapper();
    mapper.appendFields(Fields);
    mapper.setData(data);
    expect(mapper.getDataByName("fake_name")).toBe("somefakevalue");
  });

  test("should display in 1 line if data array", () => {
    const Fields = [
      {
        name: "fake_name",
        label: "Fake Label",
        style: "tableColSmall",
        data_key: {
          fake: ["test", "test2"],
        },
        translations: {
          fake: "fakeTest1",
        },
      },
    ];

    const data = {
      fake: [
        {
          test: "fake",
          test2: "testk",
        },
        {
          test: "test",
          test2: "test5",
        },
      ],
    };

    const mapper = new ValueMapper();
    mapper.appendFields(Fields);
    mapper.setData(data);
    expect(mapper.getDataByName("fake_name")).toEqual(
      "fakeTest1, testk \ntest, test5 \n"
    );
  });

  test("should apply content", () => {
    const Fields = [
      {
        name: "fake_field",
        label: "Fake Description",
        data_key: ["fake1", "fake2"],
        content: () => {
          return "<%=0%> test fake \n <%=1%> some word";
        },
        translations: {
          fakeTest: "fakeTest1",
        },
      },
    ];

    const data = {
      fake1: "word",
      fake2: "fakeTest",
    };

    const mapper = new ValueMapper();
    mapper.appendFields(Fields);
    mapper.setData(data);
    expect(mapper.getDataByName("fake_field")).toEqual(
      "word test fake \n fakeTest1 some word"
    );
  });

  test("should return decorator if exists", () => {
    const Fields = [
      {
        name: "fake_field",
        label: "Fake Description",
        data_key: ["fake1", "fake2"],
        content: () => {
          return "<%=0%>corated";
        },
        decorate: (value) => {
          return `d${value}`;
        },
      },
    ];

    const data = {
      fake1: "e",
    };

    const mapper = new ValueMapper();
    mapper.appendFields(Fields);
    mapper.setData(data);
    expect(mapper.getDataByName("fake_field")).toEqual("decorated");
  });

  test("should apply content if value is inside object", () => {
    const Fields = [
      {
        name: "fake_field",
        label: "Fake Description",
        data_key: [{ someFakeKey: "fake1" }, { someFakeKey: "fake2" }],
        content: () => {
          return "<%=0%> test fake \n <%=1%> some word";
        },
      },
    ];

    const data = {
      someFakeKey: {
        fake1: "word",
        fake2: "test",
      },
    };

    const mapper = new ValueMapper();
    mapper.appendFields(Fields);
    mapper.setData(data);
    expect(mapper.getDataByName("fake_field")).toEqual(
      "word test fake \n test some word"
    );
  });

  test("should show default value only when no data is set", () => {
    // Given
    const Fields = [
      {
        name: "fake_name1",
        label: "Fake Label",
        style: "tableColSmall",
        data_key: "fake1",
        defaultValue: "fake1default",
      },
      {
        name: "fake_name2",
        label: "Fake Label",
        style: "tableColSmall",
        data_key: "fake2",
        defaultValue: "fake2default",
      },
    ];

    const data = {
      fake1: "somefake1value",
    };

    // When
    const mapper = new ValueMapper();
    mapper.appendFields(Fields);
    mapper.setData(data);

    // Then
    expect(mapper.getDataByName("fake_name1")).toBe("somefake1value");
    expect(mapper.getDataByName("fake_name2")).toBe("fake2default");
  });

  test("should show default value when no data_key", () => {
    // Given
    const Fields = [
      {
        name: "fake_name1",
        label: "Fake Label",
        style: "tableColSmall",
        defaultValue: "fake1default",
      },
    ];

    const data = {
      fake1: "this value should not be shown",
    };

    // When
    const mapper = new ValueMapper();
    mapper.appendFields(Fields);
    mapper.setData(data);

    // Then
    expect(mapper.getDataByName("fake_name1")).toBe("fake1default");
  });

  test("should get value if data_key value is object", () => {
    const Fields = [
      {
        name: "fake_name",
        label: "Fake Label",
        style: "tableColSmall",
        data_key: {
          fake: ["test"],
        },
      },
    ];

    const data = {
      fake: {
        test: "fake",
        test2: "fake2",
      },
    };

    const mapper = new ValueMapper();
    mapper.appendFields(Fields);
    mapper.setData(data);
    expect(mapper.getDataByName("fake_name")).toEqual("fake \n");
  });

  test("should get by value from translations", () => {
    // Given
    const Fields = [
      {
        name: "fake_name1",
        label: "Fake Label",
        style: "tableColSmall",
        data_key: "somefake",
        translations: {
          somefake1value: "test translation",
        },
      },
      {
        name: "fake_name2",
        label: "Fake Label",
        style: "tableColSmall",
        data_key: "fake2",
        defaultValue: "fake2default",
      },
    ];

    const data = {
      somefake: "somefake1value",
    };

    // When
    const mapper = new ValueMapper();
    mapper.appendFields(Fields);
    mapper.setData(data);

    // Then
    expect(mapper.getDataByName("fake_name1")).toBe("test translation");
    expect(mapper.getDataByName("fake_name2")).toBe("fake2default");
  });

  test("should not display undefined values", () => {
    const Fields = [
      {
        name: "fake_name",
        label: "Fake Label",
        style: "tableColSmall",
        data_key: {
          fake: ["test", "test2"],
        },
        translations: {
          fake: "fakeTest1",
        },
      },
    ];

    const data = {
      fake: [
        {
          test: "fake",
          test2: "testk",
        },
        {
          test: "test",
          test2: "test5",
        },
        {
          test: "",
          test2: "test6",
        },
        {
          test: null,
          test2: "fake",
        },
        {
          test: "test7",
          test2: null,
        },
      ],
    };

    const mapper = new ValueMapper();
    mapper.appendFields(Fields);
    mapper.setData(data);
    expect(mapper.getDataByName("fake_name")).toEqual(
      "fakeTest1, testk \ntest, test5 \ntest6 \nfakeTest1 \ntest7 \n"
    );
  });
});
