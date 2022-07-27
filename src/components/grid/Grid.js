import React, { Component } from 'react';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';

class Grid extends Component {

    // const rowData = [
    //     { Client: 'Osmania University', Total_Credits: '18336', Used: 12386, Remining: 92, Affliations: 223, Signed_up: 22 },
    //     { Client: 'Indian School of Business', Total_Credits: '18336', Used: 12386, Remining: 92, Affliations: 223, Signed_up: 22 },
    //     { Client: 'New York University', Total_Credits: '18336', Used: 12386, Remining: 92, Affliations: 223, Signed_up: 22 },
    //     { Client: 'Michigan State University', Total_Credits: '18336', Used: 12386, Remining: 92, Affliations: 223, Signed_up: 22 },
    //     { Client: 'Osmania University', Total_Credits: '18336', Used: 12386, Remining: 92, Affliations: 223, Signed_up: 22 },
    //     { Client: 'Indian School of Business', Total_Credits: '18336', Used: 12386, Remining: 92, Affliations: 223, Signed_up: 22 },
    //     { Client: 'New York University', Total_Credits: '18336', Used: 12386, Remining: 92, Affliations: 223, Signed_up: 22 },
    //     { Client: 'Michigan State University', Total_Credits: '18336', Used: 12386, Remining: 92, Affliations: 223, Signed_up: 22 },
    //     { Client: 'Osmania University', Total_Credits: '18336', Used: 12386, Remining: 92, Affliations: 223, Signed_up: 22 },
    //     { Client: 'Indian School of Business', Total_Credits: '18336', Used: 12386, Remining: 92, Affliations: 223, Signed_up: 22 },

    // ]
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                { headerName: "University", field: "Client" },
                { headerName: "Total Credits", field: "Total_Credits" },
                { headerName: "Used", field: "Used" },
                { headerName: "Remining", field: "Remining" },
                { headerName: "Affliations", field: "Affliations" },
                { headerName: "Signed_up", field: "Signed_up" }
            ],
            rowData: [
                { Client: 'Osmania University', Total_Credits: '18336', Used: 12386, Remining: 92, Affliations: 223, Signed_up: 22 },
                { Client: 'Indian School of Business', Total_Credits: '18336', Used: 12386, Remining: 92, Affliations: 223, Signed_up: 22 },
                { Client: 'New York University', Total_Credits: '18336', Used: 12386, Remining: 92, Affliations: 223, Signed_up: 22 },
                { Client: 'Michigan State University', Total_Credits: '18336', Used: 12386, Remining: 92, Affliations: 223, Signed_up: 22 },
                { Client: 'Osmania University', Total_Credits: '18336', Used: 12386, Remining: 92, Affliations: 223, Signed_up: 22 },
                { Client: 'Indian School of Business', Total_Credits: '18336', Used: 12386, Remining: 92, Affliations: 223, Signed_up: 22 },
                { Client: 'New York University', Total_Credits: '18336', Used: 12386, Remining: 92, Affliations: 223, Signed_up: 22 },
                { Client: 'Michigan State University', Total_Credits: '18336', Used: 12386, Remining: 92, Affliations: 223, Signed_up: 22 },
                { Client: 'Osmania University', Total_Credits: '18336', Used: 12386, Remining: 92, Affliations: 223, Signed_up: 22 },
                { Client: 'Indian School of Business', Total_Credits: '18336', Used: 12386, Remining: 92, Affliations: 223, Signed_up: 22 },
            ]
        }
    }

    render() {
        return (
            <main
                className="ag-theme-alpine"
                style={{
                    height: '100%',
                    width: '100%',
                    padding: '35px'
                }}
            >
                <AgGridReact  style={{
                    width: '100%',
                }}
                    defaultColDef={{ sortable: true, filter: true, resizable: true }}
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}>
                </AgGridReact>
            </main>
        );
    }
}



export default Grid;