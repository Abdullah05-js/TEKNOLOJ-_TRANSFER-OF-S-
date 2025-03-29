const createPdfWithPagination = async (tableRef, tableName) => {
        
        if (!tableRef.current) {
            console.error('Table reference is null');
            return;
        }

        const pdf = document.createElement('div');
        pdf.style.width = '100%';
        pdf.style.minHeight = '297mm';
        pdf.style.maxWidth = '210mm';
        pdf.style.margin = '0 auto';
        pdf.style.backgroundColor = 'black';

        const mainTarget = TableRef.current.cloneNode(true)
        const rowsPerPage = 8
        let page = 1;
        let Targetindex = 0;
        let totalRows = mainTarget.querySelector('tbody').children.length;
        
        for (let index = 0; index < Data.List.length; index += rowsPerPage) {
            const pdfContainer = document.createElement('div');
            pdfContainer.style.width = '100%';
            pdfContainer.style.maxWidth = '210mm';
            pdfContainer.style.margin = '0 auto';
            if (index === 0) {
                const logoElement = document.createElement('div');
                logoElement.style.textAlign = 'center';
                logoElement.style.marginBottom = '20px';
                const logoImg = document.createElement('img');
                logoImg.src = logo;
                logoImg.style.width = '50%';
                logoImg.style.maxWidth = '300px';
                logoElement.appendChild(logoImg);
                pdfContainer.appendChild(logoElement);
                const Header = mainTarget.querySelector('thead').cloneNode(true);
                pdfContainer.appendChild(Header)
            }
           pdfContainer.style.pageBreakAfter = page*rowsPerPage < totalRows ? 'always' : 'avoid';

           console.log(mainTarget);
            for (let i= Targetindex; i< page*rowsPerPage; i++) {
                if(i >= mainTarget.querySelector('tbody').children.length)
                    break

                const row = mainTarget.querySelector('tbody').children[i].cloneNode(true);
                const newTR= document.createElement("tr")
               
                row.className === "text-white" ? newTR.className === "text-white" : newTR.className === "text-white"

                row.children.forEach(element => {
                    const td = document.createElement("td")
                    td.innerHTML = element.innerHTML    
                    newTR.appendChild(td)
                })
                pdfContainer.appendChild(newTR)
            }
            page++
            totalRows -=8
            Targetindex +=8

            pdf.appendChild(pdfContainer)
        }


        // PDF options
        const opt = {
            margin: 1,
            filename: `${tableName}_${new Date().toISOString().split('T')[0]}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                logging: false,
                useCORS: true,
                allowTaint: true,
                scrollY: 0,

            },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait"
            },
            pagebreak: { mode: ['css', 'legacy'] }
        };

        // Generate and save PDF
        return new Promise((resolve, reject) => {
            try {
                html2pdf()
                    .set(opt)
                    .from(pdf)
                    .save()
                    .then(() => resolve())
                    .catch(reject);
            } catch (error) {
                console.error('PDF generation error:', error);
                reject(error);
            }
        });
    };



    const createPdfWithPagination = async (tableRef, tableName) => {
    
            if (!tableRef.current) {
                console.error('Table reference is null');
                return;
            }
    
            const pdf = document.createElement('div');
            pdf.style.width = '100%';
            pdf.style.minHeight = '297mm';
            pdf.style.maxWidth = '210mm';
            pdf.style.margin = '0 auto';
            pdf.style.backgroundColor = 'black';
            const ArrayLength = Data.List.length
            const rowsPerPage = 7
            let page = 1
    
            console.log(ArrayLength, "--------");
    
            for (let index = 0; index < ArrayLength; index += rowsPerPage) {
                const Table = document.createElement("table")
                Table.className = "w-full border-collapse flex flex-col flex-1"
                // Table.style.pageBreakAfter = page*rowsPerPage < ArrayLength ? 'always' : 'avoid';
                if (index % 7 == 0) {
                    const Header = document.createElement("thead")
                    Header.className = "border-b-2 border-white bg-black"
                    const tr = document.createElement("tr")
                    tr.style.backgroundColor = "white"
                    const thNO = document.createElement("th")
                    thNO.style.border = "1px"
                    thNO.style.borderColor = "#86efac"
                    thNO.style.color = "black"
                    thNO.innerHTML = "No"
                    tr.appendChild(thNO)
                    Object.keys(TableHeaders).map((e) => {
                        if (TableHeaders[e] && e !== "ConversationDetails") {
                            console.log(e);
                            const Th = document.createElement("th")
                            Th.innerHTML = {
                                isArge: "Arge Merkezi",
                                Teklif: "Teklif",
                                isGelistirme: "İş Geliştirme",
                                isProtocolSigned: "Protokol",
                                Academics: "Akademisyen",
                                CompanyNames: "Firma",
                                Contract: "Sözleşme",
                                Date: "Tarih",
                                ConversationOwners: "Görüşmeyi YK.",
                            }[e]
                            tr.appendChild(Th)
                        }
                    })
                    Header.appendChild(tr)
                    Table.appendChild(Header)
                }
    
                const tBody = document.createElement("tbody")
    
                Data?.List.forEach((e, index) => {
    
                    const tr = document.createElement("tr")
                    tr.className = index % 2 === 0 ? "text-white" : "text-black"
                    const tdNo = document.createElement("td")
                    tdNo.innerHTML = index + 1 + (Filter.page * 15 - 15)
                    tr.appendChild(tdNo)
                    if (TableHeaders["Date"]) {
                        const tdDate = document.createElement("td")
                        tdDate.innerHTML = e["Date"]
                        tr.appendChild(tdDate)
                    }
                    Object.keys(e).map((name) => {
                        if (TableHeaders[name] && name !== "ConversationDetails" && name !== "Date") {
                            const td = document.createElement("td")
                            if (name === "isGelistirme" || name === "isProtocolSigned" || name === "isArge") {
                                td.innerHTML = e[name] ? "Var" : "Yok"
                            } else if (name === "ConversationOwners" || name === "Academics" || name === "CompanyNames" || name === "ConversationDetails") {
                                td.innerHTML = name !== "Academics" ? (e[name].length > 100 ? e[name].slice(0, 10) + "..." : e[name]) : e[name].AcademicNames.length > 150 ? e[name].AcademicNames.slice(0, 15) + "..." : e[name].AcademicNames
                            } else if (name === "Teklif" || name === "Contract") {
                                td.innerHTML = name === "Contract" ? (e[name].isContractSigned ? e[name].ContractType : "Yok") : (e[name].isTeklif ? "Var" : "Yok")
                            }
                            console.log(td);
                            tr.appendChild(td)
                        }
                    })
                    tBody.appendChild(tr)
                })
                Table.appendChild(tBody)
                pdf.appendChild(Table)
                page++
            }
    
    
    
    
            // PDF options
            const opt = {
                margin: 1,
                filename: `${tableName}_${new Date().toISOString().split('T')[0]}.pdf`,
                html2canvas: {
                    scale: 2,
                    logging: false,
                    useCORS: true,
                    allowTaint: true,
                    scrollY: 0,
    
                },
                jsPDF: {
                    unit: "mm",
                    format: "a4",
                    orientation: "portrait"
                },
                pagebreak: { mode: ['css', 'legacy'] }
            };
    
            // Generate and save PDF
            return new Promise((resolve, reject) => {
                try {
                    html2pdf()
                        .set(opt)
                        .from(pdf)
                        .save()
                        .then(() => resolve())
                        .catch(reject);
                } catch (error) {
                    console.error('PDF generation error:', error);
                    reject(error);
                }
            });
        };