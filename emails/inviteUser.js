module.exports = function inviteUser(id) {
  return `
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
      <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <title></title>
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
      <!--<![endif]-->
      <style type="text/css">
        body {
          margin: 0;
          padding: 0;
        }
    
        table,
        td,
        tr {
          vertical-align: top;
          border-collapse: collapse;
        }
    
        * {
          line-height: inherit;
        }
    
        a[x-apple-data-detectors=true] {
          color: inherit !important;
          text-decoration: none !important;
        }
    
        .ie-browser table {
          table-layout: fixed;
        }
    
        [owa] .img-container div,
        [owa] .img-container button {
          display: block !important;
        }
    
        [owa] .fullwidth button {
          width: 100% !important;
        }
    
        [owa] .block-grid .col {
          display: table-cell;
          float: none !important;
          vertical-align: top;
        }
    
        .ie-browser .block-grid,
        .ie-browser .num12,
        [owa] .num12,
        [owa] .block-grid {
          width: 700px !important;
        }
    
        .ie-browser .mixed-two-up .num4,
        [owa] .mixed-two-up .num4 {
          width: 232px !important;
        }
    
        .ie-browser .mixed-two-up .num8,
        [owa] .mixed-two-up .num8 {
          width: 464px !important;
        }
    
        .ie-browser .block-grid.two-up .col,
        [owa] .block-grid.two-up .col {
          width: 348px !important;
        }
    
        .ie-browser .block-grid.three-up .col,
        [owa] .block-grid.three-up .col {
          width: 348px !important;
        }
    
        .ie-browser .block-grid.four-up .col [owa] .block-grid.four-up .col {
          width: 174px !important;
        }
    
        .ie-browser .block-grid.five-up .col [owa] .block-grid.five-up .col {
          width: 140px !important;
        }
    
        .ie-browser .block-grid.six-up .col,
        [owa] .block-grid.six-up .col {
          width: 116px !important;
        }
    
        .ie-browser .block-grid.seven-up .col,
        [owa] .block-grid.seven-up .col {
          width: 100px !important;
        }
    
        .ie-browser .block-grid.eight-up .col,
        [owa] .block-grid.eight-up .col {
          width: 87px !important;
        }
    
        .ie-browser .block-grid.nine-up .col,
        [owa] .block-grid.nine-up .col {
          width: 77px !important;
        }
    
        .ie-browser .block-grid.ten-up .col,
        [owa] .block-grid.ten-up .col {
          width: 60px !important;
        }
    
        .ie-browser .block-grid.eleven-up .col,
        [owa] .block-grid.eleven-up .col {
          width: 54px !important;
        }
    
        .ie-browser .block-grid.twelve-up .col,
        [owa] .block-grid.twelve-up .col {
          width: 50px !important;
        }
      </style>
      <style type="text/css" id="media-query">
        @media only screen and (min-width: 720px) {
          .block-grid {
            width: 700px !important;
          }
    
          .block-grid .col {
            vertical-align: top;
          }
    
          .block-grid .col.num12 {
            width: 700px !important;
          }
    
          .block-grid.mixed-two-up .col.num3 {
            width: 174px !important;
          }
    
          .block-grid.mixed-two-up .col.num4 {
            width: 232px !important;
          }
    
          .block-grid.mixed-two-up .col.num8 {
            width: 464px !important;
          }
    
          .block-grid.mixed-two-up .col.num9 {
            width: 522px !important;
          }
    
          .block-grid.two-up .col {
            width: 350px !important;
          }
    
          .block-grid.three-up .col {
            width: 233px !important;
          }
    
          .block-grid.four-up .col {
            width: 175px !important;
          }
    
          .block-grid.five-up .col {
            width: 140px !important;
          }
    
          .block-grid.six-up .col {
            width: 116px !important;
          }
    
          .block-grid.seven-up .col {
            width: 100px !important;
          }
    
          .block-grid.eight-up .col {
            width: 87px !important;
          }
    
          .block-grid.nine-up .col {
            width: 77px !important;
          }
    
          .block-grid.ten-up .col {
            width: 70px !important;
          }
    
          .block-grid.eleven-up .col {
            width: 63px !important;
          }
    
          .block-grid.twelve-up .col {
            width: 58px !important;
          }
        }
    
        @media (max-width: 720px) {
    
          .block-grid,
          .col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
    
          .block-grid {
            width: 100% !important;
          }
    
          .col {
            width: 100% !important;
          }
    
          .col>div {
            margin: 0 auto;
          }
    
          img.fullwidth,
          img.fullwidthOnMobile {
            max-width: 100% !important;
          }
    
          .no-stack .col {
            min-width: 0 !important;
            display: table-cell !important;
          }
    
          .no-stack.two-up .col {
            width: 50% !important;
          }
    
          .no-stack.mixed-two-up .col.num4 {
            width: 33% !important;
          }
    
          .no-stack.mixed-two-up .col.num8 {
            width: 66% !important;
          }
    
          .no-stack.three-up .col.num4 {
            width: 33% !important;
          }
    
          .no-stack.four-up .col.num3 {
            width: 25% !important;
          }
    
          .mobile_hide {
            min-height: 0px;
            max-height: 0px;
            max-width: 0px;
            display: none;
            overflow: hidden;
            font-size: 0px;
          }
        }
      </style>
    </head>
    
    <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;">
    <style type="text/css" id="media-query-bodytag">
    @media (max-width: 720px) {
      .block-grid {
        min-width: 320px!important;
        max-width: 100%!important;
        width: 100%!important;
        display: block!important;
      }
      .col {
        min-width: 320px!important;
        max-width: 100%!important;
        width: 100%!important;
        display: block!important;
      }
      .col > div {
        margin: 0 auto;
      }
      img.fullwidth {
        max-width: 100%!important;
        height: auto!important;
      }
      img.fullwidthOnMobile {
        max-width: 100%!important;
        height: auto!important;
      }
      .no-stack .col {
        min-width: 0!important;
        display: table-cell!important;
      }
      .no-stack.two-up .col {
        width: 50%!important;
      }
      .no-stack.mixed-two-up .col.num4 {
        width: 33%!important;
      }
      .no-stack.mixed-two-up .col.num8 {
        width: 66%!important;
      }
      .no-stack.three-up .col.num4 {
        width: 33%!important
      }
      .no-stack.four-up .col.num3 {
        width: 25%!important
      }
    }
    </style>
      <!--[if IE]><div class="ie-browser"><![endif]-->
      <table class="nl-container" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;" cellpadding="0" cellspacing="0" width="100%" bgcolor="#FFFFFF" valign="top">
        <tbody>
          <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; vertical-align: top; border-collapse: collapse;" valign="top">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]-->
              <div style="background-color:#D9EAF1;">
                <div class="block-grid " style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;;">
                  <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#D9EAF1;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top;;">
                      <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                          <!--<![endif]-->
                          <table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top">
                            <tbody>
                              <tr style="vertical-align: top;" valign="top">
                                <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; border-collapse: collapse;" valign="top">
                                  <table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 1px solid transparent; height: 0px;" align="center" height="0" valign="top">
                                    <tbody>
                                      <tr style="vertical-align: top;" valign="top">
                                        <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;" height="0" valign="top"><span></span></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div class="img-container center fixedwidth" align="center" style="padding-right: 0px;padding-left: 0px;">
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img class="center fixedwidth" align="center" border="0" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/285876_263891/blogwise%20logo%20final.png" alt="Image" title="Image" style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; border: 0; height: auto; float: none; width: 100%; max-width: 140px; display: block;" width="140">
                            <!--[if mso]></td></tr></table><![endif]-->
                          </div>
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <div style="background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/196/bg_bot_2.jpg');background-position:top center;background-repeat:repeat;background-color:#FFFFFF;">
                <div class="block-grid " style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;;">
                  <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/196/bg_bot_2.jpg');background-position:top center;background-repeat:repeat;background-color:#FFFFFF;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:0px; padding-bottom:20px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top;;">
                      <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:20px; padding-right: 5px; padding-left: 5px;">
                          <!--<![endif]-->
                          <table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top">
                            <tbody>
                              <tr style="vertical-align: top;" valign="top">
                                <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; border-collapse: collapse;" valign="top">
                                  <table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 0px solid transparent; height: 25px;" align="center" height="25" valign="top">
                                    <tbody>
                                      <tr style="vertical-align: top;" valign="top">
                                        <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;" height="25" valign="top"><span></span></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div class="img-container center fixedwidth" align="center" style="padding-right: 0px;padding-left: 0px;">
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img class="center fixedwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/196/bot_illo_1.png" alt="Image" title="Image" style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; border: 0; height: auto; float: none; width: 100%; max-width: 586px; display: block;" width="586">
                            <!--[if mso]></td></tr></table><![endif]-->
                          </div>
                          <table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top">
                            <tbody>
                              <tr style="vertical-align: top;" valign="top">
                                <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; border-collapse: collapse;" valign="top">
                                  <table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 1px solid transparent; height: 0px;" align="center" height="0" valign="top">
                                    <tbody>
                                      <tr style="vertical-align: top;" valign="top">
                                        <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;" height="0" valign="top"><span></span></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
                          <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                            <div style="font-size: 12px; line-height: 14px; color: #555555; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;">
                              <p style="font-size: 14px; line-height: 16px; text-align: center; margin: 0;"><span style="font-size: 30px; line-height: 36px;"><strong><span style="line-height: 36px; font-size: 30px;">Congrats!</span></strong></span></p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
                          <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                            <div style="line-height: 14px; font-size: 12px; color: #555555; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;">
                              <p style="line-height: 14px; text-align: center; font-size: 12px; margin: 0;"><span style="font-size: 24px; line-height: 28px;"><strong>You've been invited to use blogwise!</strong></span></p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
                          <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                            <div style="line-height: 14px; font-size: 12px; color: #555555; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;">
                              <p style="line-height: 14px; text-align: center; font-size: 12px; margin: 0;"><span style="font-size: 15px; line-height: 18px;"><strong>This is about to change your life.</strong></span></p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <div style="background-color:transparent;">
                <div class="block-grid " style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;;">
                  <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:15px; padding-bottom:35px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top;;">
                      <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:15px; padding-bottom:35px; padding-right: 5px; padding-left: 5px;">
                          <!--<![endif]-->
                          <div class="button-container" align="center" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:37.5pt; width:142.5pt; v-text-anchor:middle;" arcsize="18%" stroke="false" fillcolor="#ffc100"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#000000; font-family:'Trebuchet MS', Tahoma, sans-serif; font-size:18px"><![endif]-->
                            <a href="https://app.blogwise.co/writer/register?id=${id}" style="text-decoration:none;display:inline-block;color:#000000;background-color:#ffc100;border-radius:9px;-webkit-border-radius:9px;-moz-border-radius:9px;width:auto; width:auto;;border-top:1px solid #ffc100;border-right:1px solid #ffc100;border-bottom:1px solid #ffc100;border-left:1px solid #ffc100;padding-top:7px;padding-bottom:7px;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:30px;padding-right:30px;font-size:18px;display:inline-block;">
                                <span style="font-size: 16px; line-height: 32px;"><span style="font-size: 18px; line-height: 36px;"><strong>GET STARTED</strong></span></span>
                              </span></a>
                            <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                          </div>
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <div style="background-color:#F2F2F2;">
                <div class="block-grid " style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;;">
                  <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F2F2F2;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:30px; padding-bottom:5px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top;;">
                      <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:30px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                          <!--<![endif]-->
                          <table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top">
                            <tbody>
                              <tr style="vertical-align: top;" valign="top">
                                <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 15px; padding-right: 15px; padding-bottom: 15px; padding-left: 15px; border-collapse: collapse;" valign="top">
                                  <table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 1px solid transparent; height: 0px;" align="center" height="0" valign="top">
                                    <tbody>
                                      <tr style="vertical-align: top;" valign="top">
                                        <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;" height="0" valign="top"><span></span></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
                          <div style="color:#033E99;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                            <div style="line-height: 14px; font-size: 12px; color: #033E99; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;">
                              <p style="line-height: 14px; text-align: center; font-size: 12px; margin: 0;"><span style="font-size: 24px; line-height: 28px;"><strong>blogwise is the fastest way to add a blog to your website, which means you can reach your audience with ease.</strong></span></p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top">
                            <tbody>
                              <tr style="vertical-align: top;" valign="top">
                                <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 20px; border-collapse: collapse;" valign="top">
                                  <table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 1px solid transparent; height: 0px;" align="center" height="0" valign="top">
                                    <tbody>
                                      <tr style="vertical-align: top;" valign="top">
                                        <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;" height="0" valign="top"><span></span></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <div style="background-color:#F2F2F2;">
                <div class="block-grid three-up" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;;">
                  <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F2F2F2;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="233" style="background-color:transparent;width:233px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div class="col num4" style="max-width: 320px; min-width: 233px; display: table-cell; vertical-align: top;;">
                      <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 5px; padding-left: 5px;">
                          <!--<![endif]-->
                          <div class="img-container center fixedwidth" align="center" style="padding-right: 0px;padding-left: 0px;">
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img class="center fixedwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/196/chat.png" alt="Image" title="Image" style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; border: 0; height: auto; float: none; width: 100%; max-width: 104px; display: block;" width="104">
                            <!--[if mso]></td></tr></table><![endif]-->
                          </div>
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 15px; padding-bottom: 5px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
                          <div style="color:#016db6;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:15px;padding-right:10px;padding-bottom:5px;padding-left:10px;">
                            <div style="line-height: 14px; font-size: 12px; color: #016db6; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;">
                              <p style="line-height: 14px; text-align: center; font-size: 12px; margin: 0;"><span style="font-size: 16px; line-height: 19px;"><strong>easiest set up ever</strong></span></p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 0px; padding-bottom: 10px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
                          <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%;padding-top:0px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                            <div style="font-size: 12px; line-height: 18px; color: #555555; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;">
                              <p style="font-size: 14px; line-height: 21px; text-align: center; margin: 0;">blogwise is built with the latest web technology to be up to 2x as fast as Wordpress. </p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td><td align="center" width="233" style="background-color:transparent;width:233px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div class="col num4" style="max-width: 320px; min-width: 233px; display: table-cell; vertical-align: top;;">
                      <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 5px; padding-left: 5px;">
                          <!--<![endif]-->
                          <div class="img-container center fixedwidth" align="center" style="padding-right: 0px;padding-left: 0px;">
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img class="center fixedwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/196/mobile.png" alt="Image" title="Image" style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; border: 0; height: auto; float: none; width: 100%; max-width: 46px; display: block;" width="46">
                            <!--[if mso]></td></tr></table><![endif]-->
                          </div>
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 15px; padding-bottom: 5px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
                          <div style="color:#016db6;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:15px;padding-right:10px;padding-bottom:5px;padding-left:10px;">
                            <div style="line-height: 14px; font-size: 12px; color: #016db6; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;">
                              <p style="line-height: 14px; text-align: center; font-size: 12px; margin: 0;"><span style="font-size: 16px; line-height: 19px;"><strong>search optimized</strong></span></p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 0px; padding-bottom: 10px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
                          <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%;padding-top:0px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                            <div style="font-size: 12px; line-height: 18px; color: #555555; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;">
                              <p style="font-size: 14px; line-height: 21px; text-align: center; margin: 0;">Help people find your site with the best SEO. If they can't find you, they can't love you.</p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td><td align="center" width="233" style="background-color:transparent;width:233px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div class="col num4" style="max-width: 320px; min-width: 233px; display: table-cell; vertical-align: top;;">
                      <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 5px; padding-left: 5px;">
                          <!--<![endif]-->
                          <div class="img-container center fixedwidth" align="center" style="padding-right: 0px;padding-left: 0px;">
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img class="center fixedwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/196/brain.png" alt="Image" title="Image" style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; border: 0; height: auto; float: none; width: 100%; max-width: 81px; display: block;" width="81">
                            <!--[if mso]></td></tr></table><![endif]-->
                          </div>
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 15px; padding-bottom: 5px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
                          <div style="color:#016db6;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:15px;padding-right:10px;padding-bottom:5px;padding-left:10px;">
                            <div style="line-height: 14px; font-size: 12px; color: #016db6; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;">
                              <p style="line-height: 14px; text-align: center; font-size: 12px; margin: 0;"><span style="font-size: 16px; line-height: 19px;"><strong>beautiful design</strong></span></p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 0px; padding-bottom: 10px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
                          <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%;padding-top:0px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                            <div style="font-size: 12px; line-height: 18px; color: #555555; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;">
                              <p style="font-size: 14px; line-height: 21px; text-align: center; margin: 0;">blogwise blogs feature a clean, sharp UI that gets out of the way and lets your content do the talking.</p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <div style="background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/196/div_bg.png');background-position:top left;background-repeat:no-repeat;background-color:transparent;">
                <div class="block-grid " style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;;">
                  <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/196/div_bg.png');background-position:top left;background-repeat:no-repeat;background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top;;">
                      <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                          <!--<![endif]-->
                          <table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top">
                            <tbody>
                              <tr style="vertical-align: top;" valign="top">
                                <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 35px; padding-right: 35px; padding-bottom: 35px; padding-left: 35px; border-collapse: collapse;" valign="top">
                                  <table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 0px solid transparent; height: 25px;" align="center" height="25" valign="top">
                                    <tbody>
                                      <tr style="vertical-align: top;" valign="top">
                                        <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;" height="25" valign="top"><span></span></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <div style="background-color:transparent;">
                <div class="block-grid " style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;;">
                  <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:30px; padding-bottom:50px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top;;">
                      <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:30px; padding-bottom:50px; padding-right: 10px; padding-left: 10px;">
                          <!--<![endif]-->
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 5px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
                          <div style="color:#033e99;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:5px;padding-left:10px;">
                            <div style="line-height: 14px; font-size: 12px; color: #033e99; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;">
                              <p style="line-height: 14px; text-align: center; font-size: 12px; margin: 0;"><span style="font-size: 28px; line-height: 33px;"><strong>intrigued? we thought so</strong></span></p>
                              <p style="line-height: 14px; text-align: center; font-size: 12px; margin: 0;"> </p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <div class="img-container center fixedwidth" align="center" style="padding-right: 10px;padding-left: 10px;">
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 10px;padding-left: 10px;" align="center"><![endif]--><img class="center fixedwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/196/philosophy.png" alt="Image" title="Image" style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; border: 0; height: auto; float: none; width: 100%; max-width: 455px; display: block;" width="455">
                            <div style="font-size:1px;line-height:30px"> </div>
                            <!--[if mso]></td></tr></table><![endif]-->
                          </div>
                          <div class="button-container" align="center" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:43.5pt; width:150pt; v-text-anchor:middle;" arcsize="16%" strokeweight="3pt" strokecolor="#016DB6" fill="false"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#016DB6; font-family:'Trebuchet MS', Tahoma, sans-serif; font-size:18px"><![endif]-->
                            <div style="text-decoration:none;display:inline-block;color:#016DB6;background-color:transparent;border-radius:9px;-webkit-border-radius:9px;-moz-border-radius:9px;width:auto; width:auto;;border-top:4px solid #016DB6;border-right:4px solid #016DB6;border-bottom:4px solid #016DB6;border-left:4px solid #016DB6;padding-top:7px;padding-bottom:7px;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:30px;padding-right:30px;font-size:18px;display:inline-block;">
                                <span style="font-size: 16px; line-height: 32px;"><span style="font-size: 18px; line-height: 36px;"><strong>find out more</strong></span></span>
                              </span></div>
                            <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                          </div>
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <div style="background-color:#D9EAF1;">
                <div class="block-grid mixed-two-up no-stack" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;;">
                  <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#D9EAF1;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="233" style="background-color:transparent;width:233px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:35px; padding-bottom:35px;"><![endif]-->
                    <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 232px;;">
                      <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:35px; padding-bottom:35px; padding-right: 0px; padding-left: 0px;">
                          <!--<![endif]-->
                          <div class="img-container left fixedwidth" align="left" style="padding-right: 0px;padding-left: 10px;">
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 10px;" align="left"><![endif]--><img class="left fixedwidth" align="left" border="0" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/285876_263891/blogwise%20logo-05.png" alt="Image" title="Image" style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; border: 0; height: auto; float: none; width: 100%; max-width: 58px; display: block;" width="58">
                            <!--[if mso]></td></tr></table><![endif]-->
                          </div>
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td><td align="center" width="466" style="background-color:transparent;width:466px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:40px; padding-bottom:5px;"><![endif]-->
                    <div class="col num8" style="display: table-cell; vertical-align: top; min-width: 320px; max-width: 464px;;">
                      <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:40px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                          <!--<![endif]-->
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 15px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
                          <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:10px;padding-right:15px;padding-bottom:10px;padding-left:10px;">
                            <div style="font-size: 12px; line-height: 14px; color: #555555; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;">
                              <p style="font-size: 14px; line-height: 16px; text-align: right; margin: 0;"><span style="color: #033e99; font-size: 14px; line-height: 16px;"><strong>blogwise</strong></span> - lightning fast, never boring</p>
                              <p style="font-size: 14px; line-height: 16px; text-align: right; margin: 0;">Cambridge, MA 02138</p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
      <!--[if (IE)]></div><![endif]-->
    </body>  
    </html>
  `
}
