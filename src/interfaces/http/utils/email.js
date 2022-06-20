//"use strict";

const fs = require('fs');
const path = require('path');
const html_to_pdf = require('html-pdf-node');
const nodemailer = require("nodemailer");
const axios = require('./axios');
const { yymmdd } = require('./helper');
const USD_TO_SAR = parseFloat(process.env.USD_TO_SAR);

async function main(email, subject, html, attachments) {
    
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        service: process.env.EMAIL_SERVICE,
        port: process.env.EMAIL_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER, // generated ethereal user
            pass: process.env.EMAIL_PWD, // generated ethereal password
        },
        from: process.env.EMAIL_USER, // sender address
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.EMAIL_USER, // sender address
        to: `${email}`, // list of receivers
        bcc: process.env.EMAIL_BCC,
        subject: subject, // Subject line
        text: subject, // plain text body
        html: html, // html body,
        attachments: attachments
    });
}


const emailInvoice = async (orderItems, order, cartModel, UsersModel, OrderAddressesModel, CountryModel, OrdersModel, isEmail,isHTML) => {

    if(!isHTML){
        emailInvoiceAPI(orderItems, order, cartModel, UsersModel, OrderAddressesModel, CountryModel, OrdersModel, isEmail) 
    }else{
        emailInvoiceHTML(orderItems, order, cartModel, UsersModel, OrderAddressesModel, CountryModel, OrdersModel, isEmail);
    }

}

const emailInvoiceAPI = async (orderItems, order, cartModel, UsersModel, OrderAddressesModel, CountryModel, OrdersModel, isEmail) => {

    var html = "";
    var total = 0;
    var grandTotal = 0;
    var vat = 0;
    var shipping = 0;
    var txnId = '';
    var createdAt = '';
    var name = '';
    var email = ``;
    var orderId = ``;
    var shippingAddress = ``;
    var billingAddress = ``;
    var url = "";
    var date = (new Date());
    var userinfo ;
    var lineItems = [];

    orderId = `ORD${String(order.id).padStart(6, '0')}`;

    orderItems.forEach((e, idx) => {
        userinfo = e;
  
        total += (e.qty) * (e.price);
        vat = e.vat;
        shipping += e.shippingAmount;
        var pname = (e.arts) ? e.arts.productName : '';
        name = e.user.name;
        createdAt = e.createdAt;
        txnId = e.cartId;

        email += "," + e.user.email;
        //email += ","+e.arts.user.email;
        url = e.url;

        date = e.createdAt;

        lineItems.push( {
            "name":pname,
            "description": pname,
            "quantity": e.qty,
            "price": e.price,
            "tax_rate": {
                "rate": e.vat,
                "name": "VAT"
            }
        },)

    })

    grandTotal = (total + (total * vat) / 100) + shipping;

    shippingAddress = order.ship.addressLine1 + ' ' + order.ship.addressLine2 + ' ' + order.ship.country + ',' + order.ship.state + ',' + order.ship.city;
    billingAddress = order.bill.addressLine1 + ' ' + order.bill.addressLine2 + ' ' + order.bill.country + ',' + order.bill.state + ',' + order.bill.city;


    await axios.post({
        url: process.env.WAFEQ_URL,
        data:[
            {
                "reference": orderId,
                "invoice_number": orderId,
                "invoice_date": (date).toISOString().substr(0, 10),
                "currency": "SAR",
                "language": "en",
                "tax_amount_type": "TAX_INCLUSIVE",
                "contact": {
                    "name":  userinfo.user.name,
                    "address":  shippingAddress,
                    "email": userinfo.user.email
                },
                "channels": [
                    {
                        "medium": "email",
                        "data": {
                            "subject": "Invoice",
                            "message": "<p>Please find attached your invoice.</p>",
                            "recipients": {
                                "to": [
                                    userinfo.user.email
                                ],
                                "cc": [],
                                "bcc": []
                            }
                        }
                    }
                ],
                "line_items": lineItems
            }
        ],
        headers:{
            'Authorization':'Api-Key '+process.env.WAFEQ_AUTH,
            'Content-Type':'application/json'
        }
    })
}

const emailInvoiceHTML = async (orderItems, order, cartModel, UsersModel, OrderAddressesModel, CountryModel, OrdersModel, isEmail) => {
    const filePath = path.join(__dirname, '/template/invoice.html');
    let fileString = fs.readFileSync(filePath, { encoding: 'utf8' });

    var html = "";
    var total = 0;
    var grandTotal = 0;
    var vat = 0;
    var shipping = 0;
    var txnId = '';
    var createdAt = '';
    var name = '';
    var email = ``;
    var orderId = ``;
    var shippingAddress = ``;
    var billingAddress = ``;
    var url = "";
    var date = (new Date());

    orderId = `ORD${String(order.id).padStart(6, '0')}`;

    orderItems.forEach((e, idx) => {
 
        total += (e.qty) * (e.price);
        vat = e.vat;
        shipping += e.shippingAmount;
        var pname = (e.arts) ? e.arts.productName : '';
        name = e.user.name;
        createdAt = e.createdAt;
        txnId = e.cartId;

        email += "," + e.user.email;
        //email += ","+e.arts.user.email;
        url = e.url;

        date = e.createdAt;

        
        html += ' <tr><td style="border: #000000 thin solid; border-top: none; border-right: none; padding: 5px; "><strong>' + pname + '</td>'
            + '<td style="border: #000000 thin solid; border-top: none; border-right: none; padding: 5px; ">$ ' + e.price + '</td>'
            + '<td style="border: #000000 thin solid; border-top: none; border-right: none; padding: 5px; ">' + e.qty + '</td>'
            + '<td style="border: #000000 thin solid; border-top: none; border-right: none; padding: 5px; ">$ ' + (e.price * e.qty) + '</td>'
            + '<td style="border: #000000 thin solid; border-top: none; border-right: none; padding: 5px; ">0</td>'
            + '<td style="border: #000000 thin solid; border-top: none; border-right: none; padding: 5px; ">' + e.vat + '</td>'
            + '<td style="border: #000000 thin solid; border-top: none; border-right: none; padding: 5px; ">$ ' + (total * vat) / 100 + '</td>'
            + '<td style="border: #000000 thin solid; border-top: none; border-right: none; padding: 5px; ">$ ' + ((total * vat) / 100 + (e.price * e.qty)) + '</td>'
            + '</tr>';


    })

    grandTotal = (total + (total * vat) / 100) + shipping;

    shippingAddress = order.ship.addressLine1 + ' ' + order.ship.addressLine2 + ' ' + order.ship.country + ',' + order.ship.state + ',' + order.ship.city;
    billingAddress = order.bill.addressLine1 + ' ' + order.bill.addressLine2 + ' ' + order.bill.country + ',' + order.bill.state + ',' + order.bill.city;

    fileString = fileString.replace('{{items}}', html)
        .replace('{{taxSlug}}', (total * USD_TO_SAR) < 1000 ? 'Simplified' : '')
        .replace('{{url}}', process.env.APP_URL + '/api/uploads/?file=' + url)
        .replace('{{total}}', total)
        .replace('{{total}}', total)
        .replace('{{totalTaxAmt}}', total)
        .replace('{{shipping}}', shipping)
        .replace('{{vat}}', (total * vat) / 100)
        .replace('{{vat}}', (total * vat) / 100)
        .replace('{{vat}}', (total * vat) / 100)
        .replace('{{vatSAR}}', ((total * vat) / 100) * USD_TO_SAR)
        .replace('{{grandTotal}}', grandTotal)
        .replace('{{grandTotal}}', grandTotal)
        .replace('{{name}}', name)
        .replace('{{txnId}}', txnId)
        .replace('{{createdAt}}', createdAt)
        .replace('{{address}}', shippingAddress)
        .replace('{{country}}', order.ship.country)
        .replace('{{zipCode}}', order.ship.zipCode)
        .replace('{{state}}', order.ship.state)
        .replace('{{city}}', order.ship.city)
        .replace('{{orderId}}', orderId)
        .replace('{{invoiceDate}}', (date).toISOString().substr(0, 10))
        .replace('{{invoiceDate}}', (date).toISOString().substr(0, 10))
        .replace('{{name}}', name);
 
    const options = { format: 'A4' };
    const file = { content: fileString };
    
    const pdf = Date.now() + '.pdf';
    const pdfPath = path.join(__dirname, '/../../../../resources/uploads/' + pdf);
    await cartModel.update({ url: pdf }, { where: { orderId: orderItems[0].orderId } });
   
    html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        hippingLabel(orderItems, order, cartModel, UsersModel, OrderAddressesModel, CountryModel, OrdersModel, pdfBuffer);
        fs.writeFileSync(pdfPath, pdfBuffer);
        
        if (isEmail == true) {
            main(email, `Invoice`, fileString, [{
                filename: 'Invoice.pdf',
                path: pdfPath

            }]).catch(console.error);
        }

    });
}

const emailOnOrder = async (orderItems, order, cartModel) => {

    if (orderItems[0].orderStatus === "ACCEPTED") {
        return;
    }

    //PENDING FOR PAYMENT
    if (orderItems[0].orderStatus === "PENDING FOR PAYMENT") {
        return;
    }


    let filePath = null;

    var html = "";
    var total = 0;
    var grandTotal = 0;
    var vat = 0;
    var shipping = 0;
    var txnId = '';
    var createdAt = '';
    var name = '';
    var status = ``;
    var userDescription = ``;
    var shippingAddress = ``;
    var billingAddress = ``;
    var estimatedPickupDate = ``;
    var estimatedDeliveryDate = ``;
    var deliveryDate = ``;
    var pickUpDate = ``;
    var email = ``;
    var orderStatus = ``;
    var orderHeading = ``;
    var orderId = ``;
    
    orderItems.forEach(e => {
        
        total += (e.qty) * (e.price);
        vat = e.vat;
        shipping += e.shippingAmount;
        var pname = (e.arts) ? e.arts.productName : '';

        orderStatus = e.orderStatus;
        name = e.user.name;
        createdAt = e.createdAt;
        txnId = e.cartId;
        email = e.user.email;
        orderId = `ORD${String(e.orderId).padStart(6, '0')}`;
        estimatedPickupDate = e.estimatedPickupDate || `Yet to be decided`;
        estimatedDeliveryDate = e.estimatedDeliveryDate || `Yet to be decided`;
        deliveryDate = e.deliveryDate || `Yet to be decided`;
        pickUpDate = e.pickUpDate || `Yet to be decided`;

        e.arts.productImage = e.arts.productImage.replace('//upload', '/upload');
        e.arts.productImage = e.arts.productImage.replace('//atrumart.com', 'https://atrumart.com');

        html += '<tr valign="top">'
            + '<td style="border-bottom: #eee thin solid; padding: 10px 0"><img src="' + e.arts.productImage + '" style="width: 80px; border: #eee thin solid; padding: 3px" width="80px" /> '
            + '</td>'
            + '<td style="font-size: 14px; line-height: 24px; border-bottom: #eee thin solid; padding: 10px 0">'
            + ' <p style="margin: 0; font-size: 14px; ">' + pname + '</p>'
            + '<p style="margin: 0; font-size: 12px; ">' + e.arts.height + 'cm x ' + e.arts.weight + 'cm (Framed)</p>'
            + '<p style="margin: 0; font-size: 12px; ">Qty: ' + (e.qty) + '</p>'
            + '</td>'
            + '<td style="font-size: 14px; line-height: 24px; border-bottom: #eee thin solid; padding: 10px 0;  text-align: right"><strong>$' + (e.qty) * (e.price) + ' </strong></td>'
            + '</tr>'
    })


    shippingAddress = order.ship.addressLine1 + ' ' + order.ship.addressLine2 + ' ' + order.ship.country + ',' + order.ship.state + ',' + order.ship.city;
    billingAddress = order.bill.addressLine1 + ' ' + order.bill.addressLine2 + ' ' + order.bill.country + ',' + order.bill.state + ',' + order.bill.city;

    grandTotal = (total + (total * vat) / 100) + shipping;
    
    if (orderStatus === "PENDING FOR SHIPPING CHARGES") {
        filePath = path.join(__dirname, '/template/order/pending_shipping.html');
        orderHeading = `We will calculate shipping charges and get back to you within 48 hours.`;
    } else {
        orderHeading = orderStatus;
    }

    if (orderStatus === "CONFIRMED") {
        filePath = path.join(__dirname, '/template/order/confirmed.html');
    }

    if (orderStatus === "ACCEPTED") {
        filePath = path.join(__dirname, '/template/order/accepted.html');
    }

    if (orderStatus === "REJECTED") {
        filePath = path.join(__dirname, '/template/order/rejected.html');
    }

    if (orderStatus === "SHIPPED") {
        filePath = path.join(__dirname, '/template/order/shipped.html');
    }

    if (orderStatus === "DELIVERED") {
        filePath = path.join(__dirname, '/template/order/delivered.html');
    }


    if (orderStatus === "PENDING FOR PAYMENT ABOVE LIMIT" && shipping <= 0) {
        filePath = path.join(__dirname, '/template/order/pending_payment_above.html');
    }

    if (orderStatus === "PENDING FOR PAYMENT ABOVE LIMIT" && shipping > 0) {
        filePath = path.join(__dirname, '/template/order/pending_payment_2.html');
    }

    let fileString = fs.readFileSync(filePath, { encoding: 'utf8' });


    if (orderStatus === "PENDING FOR PAYMENT ABOVE LIMIT"){
        orderStatus = "PENDING FOR PAYMENT";
    }

    fileString = fileString
        .replace('{{taxSlug}}', (total))
        .replace('{{orderHeading}}', orderHeading)
        .replace('{{userDescription}}', `Your order has been marked as ${orderStatus}`)
        .replace('{{total}}', grandTotal)
        .replace('{{total}}', grandTotal)
        .replace('{{orderItems}}', html)
        .replace('{{shipping}}', (shipping > 0) ? shipping : 'Yet to be calculated')
        .replace('{{vat}}', (total * vat) / 100)
        .replace('{{grandTotal}}', grandTotal)
        .replace('{{name}}', name)
        .replace('{{txnId}}', txnId)
        .replace('{{orderId}}', orderId)
        .replace('{{shippingAddress}}', shippingAddress)
        .replace('{{billingAddress}}', billingAddress)
        .replace('{{shippingAmt}}', (shipping > 0) ? '$' + shipping : 'Yet to be calculated')
        .replace('{{estimatedPickupDate}}', estimatedPickupDate)
        .replace('{{estimatedDeliveryDate}}', estimatedDeliveryDate)
        .replace('{{deliveryDate}}', deliveryDate)
        .replace('{{pickUpDate}}', pickUpDate)
        .replace('{{createdAt}}', createdAt);
   
    main(email, `Order ${orderStatus} | ${orderId} | Atrum`, fileString, null).catch(console.error);

}

const paymentLink = async (orderItems, order, cartModel) => {
    let filePath = path.join(__dirname, '/template/order/payment_link.html');

    var html = "";
    var total = 0;
    var grandTotal = 0;
    var vat = 0;
    var shipping = 0;
    var txnId = '';
    var createdAt = '';
    var name = '';
    var status = ``;
    var userDescription = ``;
    var shippingAddress = ``;
    var billingAddress = ``;
    var estimatedPickupDate = ``;
    var estimatedDeliveryDate = ``;
    var deliveryDate = ``;
    var pickUpDate = ``;
    var email = ``;
    var orderStatus = ``;
    var orderHeading = ``;
    var orderId = ``;
    
    orderItems.forEach(e => {
       
        total += (e.qty) * (e.price);
        vat = e.vat;
        shipping += e.shippingAmount;
        var pname = (e.arts) ? e.arts.productName : '';

        orderStatus = e.orderStatus;
        name = e.user.name;
        createdAt = e.createdAt;
        txnId = e.cartId;
        email = e.user.email;
        orderId = `ORD${String(e.orderId).padStart(6, '0')}`;
        estimatedPickupDate = e.estimatedPickupDate || `Yet to be decided`;
        estimatedDeliveryDate = e.estimatedDeliveryDate || `Yet to be decided`;
        deliveryDate = e.deliveryDate || `Yet to be decided`;
        pickUpDate = e.pickUpDate || `Yet to be decided`;

        // html += '<tr>'
        //     + '<td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;"> ' + pname + ' </td>'
        //     + '<td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;"> $' + (e.qty) * (e.price) + ' </td>'
        //     + '</tr>';


        e.arts.productImage = e.arts.productImage.replace('//upload', '/upload');
        e.arts.productImage = e.arts.productImage.replace('//atrumart.com', 'https://atrumart.com');

        html += '<tr valign="top">'
            + '<td style="border-bottom: #eee thin solid; padding: 10px 0"><img src="' + e.arts.productImage + '" style="width: 80px; border: #eee thin solid; padding: 3px" width="80px" /> '
            + '</td>'
            + '<td style="font-size: 14px; line-height: 24px; border-bottom: #eee thin solid; padding: 10px 0">'
            + ' <p style="margin: 0; font-size: 14px; ">' + pname + '</p>'
            + '<p style="margin: 0; font-size: 12px; ">' + e.arts.height + 'cm x ' + e.arts.weight + 'cm (Framed)</p>'
            + '<p style="margin: 0; font-size: 12px; ">Qty: ' + (e.qty) + '</p>'
            + '</td>'
            + '<td style="font-size: 14px; line-height: 24px; border-bottom: #eee thin solid; padding: 10px 0;  text-align: right"><strong>$' + (e.qty) * (e.price) + ' </strong></td>'
            + '</tr>'
    })


    shippingAddress = order.ship.addressLine1 + ' ' + order.ship.addressLine2 + ' ' + order.ship.country + ',' + order.ship.state + ',' + order.ship.city;
    billingAddress = order.bill.addressLine1 + ' ' + order.bill.addressLine2 + ' ' + order.bill.country + ',' + order.bill.state + ',' + order.bill.city;

    grandTotal = (total + (total * vat) / 100) + shipping;

    let fileString = fs.readFileSync(filePath, { encoding: 'utf8' });

    fileString = fileString
        .replace('{{taxSlug}}', (total))
        .replace('{{orderHeading}}', `Your order Payment Link has been generated`)
        .replace('{{link}}', `${process.env.APP_URL}/do/payment/${txnId}`)
        .replace('{{userDescription}}', `${process.env.APP_URL}/do/payment/${txnId}`)
        .replace('{{total}}', grandTotal)
        .replace('{{total}}', grandTotal)
        .replace('{{orderItems}}', html)
        .replace('{{shipping}}', (shipping > 0) ? shipping : 'Yet to be calculated')
        .replace('{{vat}}', (total * vat) / 100)
        .replace('{{grandTotal}}', grandTotal)
        .replace('{{name}}', name)
        .replace('{{txnId}}', txnId)
        .replace('{{orderId}}', orderId)
        .replace('{{shippingAddress}}', shippingAddress)
        .replace('{{billingAddress}}', billingAddress)
        .replace('{{shippingAmt}}', (shipping > 0) ? '$' + shipping : 'Yet to be calculated')
        .replace('{{estimatedPickupDate}}', estimatedPickupDate)
        .replace('{{estimatedDeliveryDate}}', estimatedDeliveryDate)
        .replace('{{deliveryDate}}', deliveryDate)
        .replace('{{pickUpDate}}', pickUpDate)
        .replace('{{createdAt}}', createdAt);
    
    main(email, `Your order Payment Link has been generated | ${orderId} | Atrum`, fileString, null).catch(console.error);

}

const newUser = (email, link) => {
    main(email, `SignUp Verification`, `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Mailer</title>
</head>

<body style="background:#C9D9D6">

<div style="width:680px; margin:0 auto; padding:20px 50px; background:#C9D9D6; font-family:Arial, Helvetica, sans-serif">

<table cellpadding="0" cellspacing="0" width="100%">
	<tr>
    	<td ><p style="text-align: center"><img src="https://staging.app.atrumart.com/api//upload/1642408890686.png" height="60" /></p></td> 
    </tr>
</table>
<table cellpadding="0" cellspacing="0" style="background:#fff; box-shadow: 10px 10px 40px #00000033; border:#ececec thin solid; padding:10px 20px; font-family:Tahoma, Geneva, sans-serif" width="100%" >
	<tr>
    	<td><p style="font-size:17px;">Hi, <strong>${email}</strong></p></td>
    </tr>
    <tr>
    	<td>        
        	<table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td  valign="top">
                        <p style="font-size:22px; color:#828282; line-height:30px" >You're on your way!<br />Lets confirm your email address.</strong>.</p>
						<p style="font-size:18px; color:#828282">By clicking on the following link, you are confirming your email address.</p>
						<p style="text-align: center"><a href="${process.env.APP_URL}/email/confirmation?verify=${link}" style="border: #000 thin solid; color: #fff; margin: 20px 0; background: #000; padding: 13px 23px; display: inline-block; text-decoration: none; font-size: 17px; font-weight: normal">Confirm Email Address</a></p>
                        <p style="font-size:18px; color:#828282">Thank you once again Registered with Atrum!</p>
                    </td> 
                </tr>
            </table>
        </td>
    </tr>
    
     
</table>


<table cellpadding="0" cellspacing="0"  style="padding:10px; font-family:Tahoma, Geneva, sans-serif" width="100%" >
	<tr>
        <td width="70%">
        	<p style="font-size:12px; color:#666; line-height:20px">
            	Thanks<br />
                <strong>Atrum Team</strong>
            </p>
        </td>
        <td width="30%">
        	<p style="text-align:center; color:#5c5c5c; font-size:11px; line-height: 15px;">For more information, Please visit <a href="${process.env.APP_URL}" style="color:#000">${process.env.APP_URL}</a></p>	
        </td>
    </tr>
    <tr>
    	<td colspan="2"></td>
    </tr>
</table>




</div>

</body>
</html>

    `, null).catch(console.error);
}

const resetPassword = (email, otp) => {
    main(email, `OTP Verification`, `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Mailer</title>
</head>

<body style="background:#C9D9D6">

<div style="width:680px; margin:0 auto; padding:20px 50px; background:#C9D9D6; font-family:Arial, Helvetica, sans-serif">

<table cellpadding="0" cellspacing="0" width="100%">
	<tr>
    	<td ><p style="text-align: center"><img src="https://staging.app.atrumart.com/api//upload/1642408890686.png" height="60" /></p></td> 
    </tr>
</table>
<table cellpadding="0" cellspacing="0" style="background:#fff; box-shadow: 10px 10px 40px #00000033; border:#ececec thin solid; padding:10px 20px; font-family:Tahoma, Geneva, sans-serif" width="100%" >
	<tbody>
	<tr>
    	<td align="center"><p style="font-size:25px;">Hi, <strong>${email}</strong></p></td>
    </tr>
    <tr>
    	<td>        
        	<table cellpadding="0" cellspacing="0" width="100%">
                <tbody><tr align="center">
                    <td valign="top">
                    	<p style="margin-bottom:0; font-size:20px">Your one time password is <strong>${otp}</strong>.</p>
                        <p style="font-size:13px; color:#828282; line-height:20px">We are pleased to serve you better.</p>
                        <p style="font-size:13px; color:#828282">Please don't share the OTP with anyone.</p>
                    </td> 
                </tr>
            </tbody></table>
        </td>
    </tr>
     
</tbody>
    
     
</table>


<table cellpadding="0" cellspacing="0"  style="padding:10px; font-family:Tahoma, Geneva, sans-serif" width="100%" >
	<tr>
        <td width="70%">
        	<p style="font-size:12px; color:#666; line-height:20px">
            	Thanks<br />
                <strong>Atrum Team</strong>
            </p>
        </td>
        <td width="30%">
        	<p style="text-align:center; color:#5c5c5c; font-size:11px; line-height: 15px;">For more information, Please visit <a href="${process.env.APP_URL}" style="color:#000">${process.env.APP_URL}</a></p>	
        </td>
    </tr>
    <tr>
    	<td colspan="2"></td>
    </tr>
</table>




</div>

</body>
</html>

    `, null).catch(console.error);
}

module.exports = {
    emailInvoice: emailInvoice,
    resetPassword: resetPassword,
    emailOnOrder: emailOnOrder,
    paymentLink: paymentLink,
    newUser: newUser
}