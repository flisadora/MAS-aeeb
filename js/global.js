$(document).ready(function () {

    function AppViewModel() {
        var self=this;

        self.menu=ko.observableArray([
            {"tipo":"divider"},
            {
                "tipo":"normal",
                "nome":"Início",
                "icone":"fas fa-home",
                "url":"index.html"
            },
            {"tipo":"divider"},
            {
                "tipo":"heading",
                "nome":"Gira as suas turmas!"
            },
            {
                "tipo":"normal",
                "nome":"Turma",
                "icone":"fas fa-users",
                "url":"turma.html"
            },
            {"tipo":"divider"},
            {
                "tipo":"heading",
                "nome":"Menu"
            },
            {
                "tipo":"dropdown",
                "nome":"Conteúdo",
                "id":"dropdown1",
                "icone":"fas fa-fw fa-tachometer-alt",
                "dropdownTitle":"Menu",
                "subs":[
                    {
                        "nome":"Horário",
                        "url":"horario.html"
                    },
                    {
                        "nome":"Anúncios",
                        "url":"anuncios.html"
                    },
                    {
                        "nome":"Eventos",
                        "url":"eventos.html"
                    },
                    {
                        "nome":"Ementas",
                        "url":"ementas.html"
                    },
                    {
                        "nome":"Conversas",
                        "url":"index.html"
                    }
                ]
            },
            {"tipo":"divider"}
        ])

    }

    ko.applyBindings(new AppViewModel(), document.getElementById("accordionSidebar"));
})