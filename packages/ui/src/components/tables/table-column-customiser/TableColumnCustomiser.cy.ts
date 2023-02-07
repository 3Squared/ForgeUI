import { mount } from "cypress/vue2";
import ForgeTableColumnCustomiser from "./TableColumnCustomiser.vue";
import { saveCustomisedColumns, loadCustomisedColumns } from "./column-customiser-helper";

const mountColumnCustomiser = (fields: object[]) => {
  mount(ForgeTableColumnCustomiser, {
    propsData: {
      id: "column-customiser-1",
      "data-cy": "column-customiser-1",
      fields: fields
    }
  });
};

describe.skip("Table Column Customiser", () => {
  it("should render a checkbox per key", async () => {
    //Arrange
    const fields = [{ key: "id" }, { key: "otherKey" }];
    mountColumnCustomiser(fields);

    //Act/Assert
    cy.get("[data-cy=column-customiser-1] input").should("have.length", 2);
    cy.get("[data-cy=column-customiser-1] input").first().should("have.attr", "value", "id").and("have.attr", "type", "checkbox");
    cy.get("[data-cy=column-customiser-1] input").last().should("have.attr", "value", "otherKey").and("have.attr", "type", "checkbox");
  });
});

describe.skip("column-customiser-helper.ts", () => {
  class LocalStorageMock {
    private store: any;
    constructor() {
      this.store = {};
    }

    clear() {
      this.store = {};
    }

    getItem(key: string) {
      return this.store[key] || null;
    }
  }
  const localStorage = new LocalStorageMock();
  Object.defineProperty(window, "localStorage", {
    value: localStorage
  });

  it("should save the keys of the columns to localStorage if they are just strings", () => {
    saveCustomisedColumns("test", ["FirstCol", "SecondCol"]);
    assert.equal(localStorage.getItem("test"), '["FirstCol","SecondCol"]');
  });

  it("should save the keys of the columns to localStorage when saved with correct ID", () => {
    saveCustomisedColumns("test", [{ key: "FirstCol" }, { key: "SecondCol" }]);
    assert.equal(localStorage.getItem("test"), '["FirstCol","SecondCol"]');
  });

  it("should return null if there is no matching key", () => {
    assert.isNull(loadCustomisedColumns("unknownId"));
  });

  it("should load an return a string array if there is data", () => {
    saveCustomisedColumns("knownId", [{ key: "FirstCol" }, { key: "SecondCol" }]);
    assert.deepStrictEqual(loadCustomisedColumns("knownId"), ["FirstCol", "SecondCol"]);
  });
});
