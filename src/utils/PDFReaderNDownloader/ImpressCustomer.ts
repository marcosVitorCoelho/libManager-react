import { CustomersData } from "../../contexts/CustomerContext";

export class ImpressaoCustomer {
  dadosParaImpressao: CustomersData[];
  constructor(dadosParaImpressao: CustomersData[]) {
    this.dadosParaImpressao = dadosParaImpressao;
  }
  async PreparaDocumento() {
    const corpoDocumento = this.CriaCorpoDocumento();
    const documento = this.GerarDocumento(corpoDocumento);
    return documento;
  }
  CriaCorpoDocumento() {
    const header = [
      {
        text: "Nome do Cliente",
        bold: true,
        fontSize: 9,
        margin: [0, 4, 0, 0],
      },
      { text: "CPF", bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      {
        text: "Número para contato",
        bold: true,
        fontSize: 9,
        margin: [0, 4, 0, 0],
      },
    ];
    const body = this.dadosParaImpressao.map((prod) => {
      return [
        { text: prod.firstName + " " + prod.lastName, fontSize: 8 },
        { text: prod.cpf, fontSize: 8 },
        { text: prod.phoneNumber, fontSize: 8 },
      ];
    });
    const lineHeader = [
      {
        text: "__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________",
        alignment: "center",
        fontSize: 5,
        colSpan: 3,
      },
      {},
      {},
    ];
    let content: any = [header, lineHeader];
    content = [...content, ...body];
    return content;
  }
  GerarDocumento(corpoDocumento: any) {
    const documento = {
      pageSize: "A4",
      pageMargins: [14, 53, 14, 48],
      header: function () {
        return {
          margin: [14, 12, 14, 0],
          layout: "noBorders",
          table: {
            widths: ["*"],
            body: [[{ text: "RELATÓRIO DE CLIENTES", style: "reportName" }]],
          },
        };
      },
      content: [
        {
          layout: "noBorders",
          table: {
            headerRows: 1,
            widths: ["*", 55, 55],
            body: corpoDocumento,
          },
        },
      ],
      footer(currentPage: any, pageCount: any) {
        return {
          layout: "noBorders",
          margin: [14, 0, 14, 22],
          table: {
            widths: ["auto"],
            body: [
              [
                {
                  text: "_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________",
                  alignment: "center",
                  fontSize: 5,
                },
              ],
              [
                [
                  {
                    text: `Página ${currentPage.toString()} de ${pageCount}`,
                    fontSize: 7,
                    alignment: "right",
                    /* horizontal, vertical */
                    margin: [3, 0],
                  },
                  {
                    text: "© LIBMANAGER",
                    fontSize: 7,
                    alignment: "center",
                  },
                ],
              ],
            ],
          },
        };
      },
      styles: {
        reportName: {
          fontSize: 9,
          bold: true,
          alignment: "center",
          margin: [0, 4, 0, 0],
        },
      },
    };
    return documento;
  }
}
