import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as navbarActions from "../../redux-actions/navbarActions";
import * as auditActions from "../../redux-actions/auditActions";
import Layout from "../Layout";

const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function CEFS() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.audit);

  useEffect(() => {
    dispatch(navbarActions.setAuditActive("Planeación"));
    dispatch(auditActions.setBackBttn("/audit/planning/" + audit.auditId));
  }, []);
  // state = {
  //   loggedUser: null,
  //   selectedAudit: null,
  //   // alerts
  //   showAlert: false,
  //   alertVariant: null,
  //   alertHeading: null,
  //   alertBody: null,
  //   // checkboxes
  //   c1: false,
  //   c2: false,
  //   c3: false,
  //   c4: false,
  //   c5: false,
  //   c6: false,
  //   c7: false,
  //   c8: false,
  //   c9: false,
  //   c10: false,
  //   c11: false,
  //   c12: false,
  //   c13: false,
  //   c14: false,
  //   c15: false,
  //   c16: false,
  //   c17: false,
  //   c18: false,
  //   c19: false,
  //   c20: false,
  //   answersLoaded: false
  // };

  // Loads all clients and sets them to this.state.clients

  // loadSelectedAudit = id => {
  //   API.getSelectedAudit(id)
  //     .then(res => {
  //       this.setState({ selectedAudit: res.data }, () => this.showAnswers(id));
  //     })
  //     .catch(err => console.log(err));
  // };

  // answers
  // showAnswers = id => {
  //   API.getAnswersFromCEFS(id)
  //     .then(res => {
  //       this.setState({
  //         c1: res.data.c1,
  //         c2: res.data.c2,
  //         c3: res.data.c3,
  //         c4: res.data.c4,
  //         c5: res.data.c5,
  //         c6: res.data.c6,
  //         c7: res.data.c7,
  //         c8: res.data.c8,
  //         c9: res.data.c9,
  //         c10: res.data.c10,
  //         c11: res.data.c11,
  //         c12: res.data.c12,
  //         c13: res.data.c13,
  //         c14: res.data.c14,
  //         c15: res.data.c15,
  //         c16: res.data.c16,
  //         c17: res.data.c17,
  //         c18: res.data.c18,
  //         c20: res.data.c20,
  //         answersLoaded: true
  //       });
  //     })
  //     .catch(err => console.log(err));
  // };
  // handleChangeChk = event => {
  //   const name = event.target.name;
  //   if (event.target.checked) {
  //     this.setState({
  //       [name]: true
  //     });
  //   } else {
  //     this.setState({
  //       [name]: false
  //     });
  //   }
  // };
  // handleSaveAnswers = event => {
  //   event.preventDefault();
  //   API.saveAnswersToCEFS({
  //     auditId: this.state.selectedAudit.id,
  //     c1: this.state.c1,
  //     c2: this.state.c2,
  //     c3: this.state.c3,
  //     c4: this.state.c4,
  //     c5: this.state.c5,
  //     c6: this.state.c6,
  //     c7: this.state.c7,
  //     c8: this.state.c8,
  //     c9: this.state.c9,
  //     c10: this.state.c10,
  //     c11: this.state.c11,
  //     c12: this.state.c12,
  //     c13: this.state.c13,
  //     c14: this.state.c14,
  //     c15: this.state.c15,
  //     c16: this.state.c16,
  //     c17: this.state.c17,
  //     c18: this.state.c18,
  //     c19: this.state.c19,
  //     c20: this.state.c20
  //   })
  //     .then(res => {
  //       this.handleShowAlert(
  //         "success",
  //         "Éxito.",
  //         "Los cambios han sido guardados satisfactoriamente."
  //       );
  //     })
  //     .catch(err => console.log(err));
  // };

  // alert arrow functions
  // handleShowAlert = (variant, heading, body) => {
  //   this.setState(
  //     { alertVariant: variant, alertHeading: heading, alertBody: body },
  //     () => this.setState({ showAlert: true })
  //   );
  //   // this.setState.myalert({ variant: variant, heading: heading, body: body, show: true });
  // };
  // handleCloseAlert = () => this.setState({ showAlert: false });

  // pdf
  // generatePDF = () => {
  //   let documentDefinition = {
  //     content: [
  //       {
  //         text:
  //           this.state.selectedAudit.clientAcronym +
  //           " " +
  //           this.state.selectedAudit.year,
  //         style: "headerOne"
  //       },
  //       {
  //         text: "Cédula de Estados Financieros del Sistema",
  //         style: "headerTwo"
  //       },
  //       {
  //         text: "I. Información contable, con la desagregación siguiente:",
  //         style: "title"
  //       },
  //       {
  //         text: "Estado de situación financiera."
  //       },
  //       {
  //         text: this.state.c1
  //       },
  //       {
  //         text: "Estado de variación en la hacienda pública."
  //       },
  //       {
  //         text: this.state.c2
  //       },
  //       {
  //         text: "Estado de cambios en la situación financiera."
  //       },
  //       {
  //         text: this.state.c3
  //       },
  //       {
  //         text: "Informes sobre pasivos contingentes."
  //       },
  //       {
  //         text: this.state.c4
  //       },
  //       {
  //         text: "Notas a los estados financieros."
  //       },
  //       {
  //         text: this.state.c5
  //       },
  //       {
  //         text: "Estado analítico del activo."
  //       },
  //       {
  //         text: this.state.c6
  //       },
  //       {
  //         text:
  //           "Estado analítico de la deuda, del cual se derivarán las siguientes clasificaciones:",
  //         style: "title"
  //       },
  //       {
  //         text: "Corto y largo plazo."
  //       },
  //       {
  //         text: this.state.c7
  //       },
  //       {
  //         text: "Fuentes de financiamiento."
  //       },
  //       {
  //         text: this.state.c8
  //       },
  //       {
  //         text: "Endeudamiento neto, financiamiento menos amortización."
  //       },
  //       {
  //         text: this.state.c9
  //       },
  //       {
  //         text: "Intereses de la deuda."
  //       },
  //       {
  //         text: this.state.c10
  //       },
  //       {
  //         text: "II. Información contable, con la desagregación siguiente:",
  //         style: "title"
  //       },
  //       {
  //         text:
  //           "Estado analítico de ingresos, del que se derivará la presentación en clasificación económica por fuente de financiamiento y concepto."
  //       },
  //       {
  //         text: this.state.c11
  //       },
  //       {
  //         text:
  //           "Estado analítico de ingresos, del que se derivará la presentación en clasificación económica por fuente de financiamiento y concepto.",
  //         style: "title"
  //       },
  //       {
  //         text: "Administrativa."
  //       },
  //       {
  //         text: this.state.c12
  //       },
  //       {
  //         text: "Económica y por objeto del gasto."
  //       },
  //       {
  //         text: this.state.c13
  //       },
  //       {
  //         text: "Funcional-Programática."
  //       },
  //       {
  //         text: this.state.c14
  //       },
  //       {
  //         text:
  //           "Endeudamiento neto, financiamiento menos amortización, del que derivará la clasificación por su origen en interno y externo."
  //       },
  //       {
  //         text: this.state.c15
  //       },
  //       {
  //         text: "Intereses de la deuda."
  //       },
  //       {
  //         text: this.state.c16
  //       },
  //       {
  //         text:
  //           "Un flujo de fondos que resuma todas las operaciones y los indicadores de la postura fiscal."
  //       },
  //       {
  //         text: this.state.c17
  //       },
  //       {
  //         text: "III. Información contable, con la desagregación siguiente:",
  //         style: "title"
  //       },
  //       {
  //         text: "Gasto por categoría programática."
  //       },
  //       {
  //         text: this.state.c18
  //       },
  //       {
  //         text: "Programas y proyectos de inversión."
  //       },
  //       {
  //         text: this.state.c19
  //       },
  //       {
  //         text: "Indicadores de resultados."
  //       },
  //       {
  //         text: this.state.c20
  //       }
  //     ],
  //     styles: {
  //       headerOne: {
  //         fontSize: 22,
  //         bold: true,
  //         margin: [0, 10, 0, 0],
  //         alignment: "center"
  //       },
  //       headerTwo: {
  //         fontSize: 16,
  //         margin: [0, 10, 0, 10],
  //         alignment: "center"
  //       },
  //       title: {
  //         bold: true,
  //         fontSize: 14,
  //         margin: [0, 15, 0, 10]
  //       }
  //     }
  //   };

  //   pdfMake
  //     .createPdf(documentDefinition)
  //     .download(
  //       this.state.selectedAudit.clientAcronym +
  //         " " +
  //         this.state.selectedAudit.year +
  //         " - CEFS.pdf"
  //     );
  // };

  return audit ? (
    <Layout>
      <h2>
        <span>Cédula de Estados Financieros del Sistema</span>
      </h2>
      <hr />
      ...
    </Layout>
  ) : null;
}

export default CEFS;
