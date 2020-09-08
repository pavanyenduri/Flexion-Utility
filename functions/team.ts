import { Handler, Context, Callback, APIGatewayEvent } from 'netlify-lambda';
const keys = require('./client_secret.json');
const { GoogleSpreadsheet } = require('google-spreadsheet');
let doc;

async function accessSpreadSheet() {
    doc = new GoogleSpreadsheet('1p2QiS1DLqHURAFh_JqyuOKWWhphaOTOjZd6IwdQSXaA');
    await doc.useServiceAccountAuth({
        client_email: keys.client_email,
        private_key: keys.private_key,
    });
    await doc.loadInfo();
    return doc.sheetsByIndex[0];
}


async function getTeamMembers(sheet) {
    const rows = await sheet.getRows({
        offset: 0
    });
    return rows;
}

async function addTeamMember(sheet, name: string) {
    const row = {
        Name:name
    }
    const response = await sheet.addRow(row);
    console.log('response is ', response);
}



const handler: Handler = async (
    event: APIGatewayEvent,
    context: Context,
    callback: Callback
) => {
    const queryParams = event.queryStringParameters;
    const httpMethods = event.httpMethod;
    let response;
    try {
        if (httpMethods === 'GET') {
            const sheet = await accessSpreadSheet();
            const rows = await getTeamMembers(sheet);
            let names = [];
            rows.forEach(row => {
                names.push(row.Name);
            });
            response = {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    names,
                })
            };
            callback(null, response);
        }
        else if (httpMethods === 'POST') {
            console.log('event', event);
            const sheet = await accessSpreadSheet();
            await addTeamMember(sheet, event.headers.membername);
            response = {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: event.headers['memberName'],
                })
            };
            callback(null, response);
        }
        else {
            response = {
                statusCode: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    msg: `Resource not found`,
                })
            };
            callback(null, response);
        }
    }
    catch (error) {
        callback(error);
    }
};

export { handler };