sap.ui.define([], function () {
	"use strict";
	return {

		idText: function (sId) {
            //operação booleana em string verifica se tem valor preenchido
            if(sId) {// mesmo se 'if id = true'. 
                var newId = parseInt(sId);
                return newId;
            }
        },

        statusText: function (sStatus) {
            switch (sStatus) {
                case "1":
                    return 'Pendente';
				case "2":
                    return 'Analise';
				case "3":
                    return 'Aprovado';
				case "4":
                    return 'Reprovado';
                default:
                    return sStatus;
            }
        }

	};
}); 