import { mount } from "cypress/vue2";
import FileUpload from "./FileUpload.vue";

const mountFileUploader = () => {
  mount(FileUpload, {
    propsData: {
      getFileUrlAction: function onGetUrl() {
        return new Promise((resolve) => {
          const uploadFileName = Date.now();
          setTimeout(() => {
            resolve([
              `http://127.0.0.1:10000/devstoreaccount1/forgeui/${uploadFileName}?sv=2018-03-28&st=2022-01-05T13%3A14%3A50Z&se=2022-01-06T13%3A14%3A50Z&sr=c&sp=racwdl&sig=2ujYGm7gtHU5mfSVBRAQ7M8%2FK%2FxaZFTbpQZjb4pe5qU%3D`,
              uploadFileName
            ]);
          }, 300);
        });
      },
      acceptedFileTypes: "image/gif, image/jpeg, image/png",
      maxFileSize: 52428800,
      "data-cy": "file-uploader-1"
    }
  });
};

describe("File Uploader", () => {
  //Arrange
  beforeEach(() => {
    mountFileUploader();
  });

  it("should render correctly", () => {
    //Act/Assert
    cy.get("[data-cy=file-uploader-1] div").should("contain.text", "Drag and drop files here").and("contain.text", "Max file size: 52.4 MB");
    cy.get('label[for="file-input"]').should("contain.text", "Browse your computer");
  });
});
