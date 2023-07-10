sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/ui/core/UIComponent"
], function (BaseController, JSONModel, formatter, History, MessageToast, UIComponent) {
	"use strict";
	return BaseController.extend("cristianofiori.cadastroclientes.controller.Create", {
		formatter: formatter,
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("create").attachPatternMatched(this._onCreateMatched, this);

			var oViewModel = new JSONModel({
				copies: 0
			});
			this.getView().setModel(oViewModel, "view");

			var oMessageManager = sap.ui.getCore().getMessageManager();
			//oMessageManager.registerMessageProcessor(oMessageProcessor);

			var oView = this.getView();
			oView.setModel(oMessageManager.getMessageModel(), "messagez" )

			//ALTERAÇÕES LIVE 24
			//COLETAR A INSTANCIA DA VIEW
			//var oView = this.getView();

			//registrar a view no message manager
			//sap.ui.getCore().getMessageManager().registerObject(oView, true);
		},

		_onCreateMatched: function (oEvent) {

			this.getView().getModel("view").setProperty("/copies", 0);

			var m = this.getView().getModel();
			m.metadataLoaded().then(function(){
			 var oContext = m.createEntry('/ClienteSet',
				 {
				  properties: {
					  Telefone: '1234',
					  Email: 'oi@email.com'
				  }
				 });
   
			 this.getView().bindElement({
				 path: oContext.getPath()
				 //model: "",
			 });
			}.bind(this))
		},
   

		onNavBack: function () {
			var m = this.getView().getModel();
			m.resetChanges();

			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("worklist", {}, true);
			}

		},

		onCancelar: function (oEvent) {
			this.onNavBack();
		},
		onGravar: function (evt) {

			var oModel = this.getModel();

			var dados = {
				Nome: this.byId("inpNome").getValue(),
				Telefone: this.byId("inpUF").getValue(),
				UF: this.byId("inpEmail").getValue(),
				Email: this.byId("inpTelefone").getValue(),
				Status: "1"
			};

			oModel.create("/ClienteSet", dados, {
				success: function (oDados, resposta) {

					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

					oRouter.navTo("object", {
						objectId: oDados.ClienteID
					}, true);


				}.bind(this),

				error: function (oError) {

					debugger

				}.bind(this),

			});

		},
		onGravar2: function (oEvent) {
			var m = this.getView().getModel();

			this.getView().setBusy(true);

			var iCopies = this.getView().getModel("view").getProperty("/copies");
			var oNewCliente = this.getView().getBindingContext().getObject();

			for (var i=0;i<iCopies; i++){
				m.createEntry('/ClienteSet', {
					properties: {
						Nome: oNewCliente.Nome + " (Copia "+(i+1)+")",
						UF: oNewCliente.UF,
						Email: oNewCliente.Email,
						Telefone: oNewCliente.Telefone,
					}
				});
			}

			m.submitChanges({
				success: function (oData) {

					this.getView().setBusy(false);

					MessageToast.show("Cliente criado com sucesso.");

					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

					oRouter.navTo("object", {
						objectId: this.getView().getBindingContext().getObject().ClienteID
					}, true);

				}.bind(this),
				error: function (oData) {

					MessageToast.show("Aconteceu um erro.");

					console.error(oData);

					this.getView().setBusy(false);
				},
			});

		}

	});
});
