sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit() {
        },
        onUploadChange: function (oEvent) {
            var oFileUploader = oEvent.getSource();

            // Always clear any old headers before adding new ones
            oFileUploader.removeAllHeaderParameters();

            // OPTIONAL: Link the upload to a parent entity
            // if you're uploading a file for a specific order or project,
            // you can pass its ID as a header. Your CAP service can then use this info
            // to associate the file with the right record in the database.
            // Make sure the 'to_parentEntity_ID' field exists in your entity if you want to store it.
            // Example:
            // oFileUploader.addHeaderParameter(
            //     new sap.ui.unified.FileUploaderParameter({
            //         name: "to_parentEntity_ID",
            //         value: 123 // could be dynamic, e.g., selected table row ID
            //     })
            // );

            oFileUploader.addHeaderParameter(
                new sap.ui.unified.FileUploaderParameter({
                    name: "fileName",
                    value: oEvent.getParameter("files")[0].name
                })
            );

            oFileUploader.addHeaderParameter(
                new sap.ui.unified.FileUploaderParameter({
                    name: "slug",
                    value: oEvent.getSource().getValue(),
                })
            );

            // Ensure XHR is used for sending the file (needed for headers to work)
            oFileUploader.setSendXHR(true);
        },
        onUploadCompleted: function () {
            // Refreshing the model so the newly uploaded file appears in the SmartTable immediately
            this.getView().getModel().refresh();
            var oSmartTable = this.byId("SmartTableId");
            if (oSmartTable) {
                oSmartTable.rebindTable();
            }
        },
        _onDocumentLinkPress: function (oEvent) {
            const sItem = oEvent.getSource().getBindingContext().getObject();
            var link = document.createElement('a');
            link.href = sItem.__metadata.media_src;
            link.setAttribute('download', sItem.fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });
});