import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrderSuccess = () => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedOrder = sessionStorage.getItem('vive_last_order');
    if (savedOrder) {
      try {
        setOrderDetails(JSON.parse(savedOrder));
      } catch (e) {
        // Fallback
      }
    }
  }, []);

  // Generates and prints a luxury PDF tax invoice
  const handleDownloadInvoice = () => {
    if (!orderDetails) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to download your invoice");
      return;
    }

    const todayDate = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const uniqueInvoiceNo = `INV-${orderDetails.orderNumber.split('-')[2]}`;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>VIVE Beauty Invoice - ${uniqueInvoiceNo}</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Playfair+Display:ital,wght@0,600;0,800;1,400&display=swap" rel="stylesheet">
          <style>
            body { 
              font-family: 'Inter', sans-serif; 
              padding: 50px; 
              color: #1A1A1A; 
              line-height: 1.6; 
              background-color: #ffffff;
            }
            .invoice-wrapper {
              max-width: 800px;
              margin: 0 auto;
              border: 1px solid #EFEAE2;
              padding: 40px;
              border-radius: 20px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.02);
            }
            .invoice-header { 
              display: flex; 
              justify-content: space-between; 
              align-items: flex-start; 
              border-bottom: 2px solid #8A1B5E; 
              padding-bottom: 25px; 
              margin-bottom: 35px; 
            }
            .brand-section h1 {
              font-family: 'Playfair Display', serif;
              font-size: 32px;
              font-weight: 800;
              color: #8A1B5E;
              margin: 0;
              letter-spacing: -0.5px;
            }
            .brand-section p {
              font-size: 11px;
              color: #9A8A78;
              text-transform: uppercase;
              letter-spacing: 2px;
              font-weight: 600;
              margin: 5px 0 0 0;
            }
            .meta-section {
              text-align: right;
            }
            .invoice-title { 
              font-size: 20px; 
              font-weight: 700; 
              text-transform: uppercase; 
              letter-spacing: 3px; 
              color: #2D2D2D;
              margin: 0 0 8px 0;
            }
            .meta-text {
              font-size: 12px;
              color: #666;
              margin: 2px 0;
            }
            .meta-text strong {
              color: #1A1A1A;
            }
            .info-grid { 
              display: grid; 
              grid-template-cols: 1fr 1fr; 
              gap: 40px; 
              margin-bottom: 40px; 
            }
            .info-box {
              background-color: #FAF8F5;
              border-radius: 12px;
              padding: 20px;
              border: 1px solid #F3EDE2;
            }
            .section-title { 
              font-size: 10px; 
              font-weight: 700; 
              text-transform: uppercase; 
              color: #8A1B5E; 
              letter-spacing: 1.5px; 
              margin-bottom: 12px; 
              border-bottom: 1px solid #EFEAE2;
              padding-bottom: 6px;
            }
            .info-box p {
              margin: 3px 0;
              font-size: 12.5px;
              color: #4D4D4D;
            }
            .info-box p strong {
              color: #1A1A1A;
            }
            .items-table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-bottom: 35px; 
            }
            .items-table th { 
              border-bottom: 2px solid #2D2D2D; 
              padding: 12px 10px; 
              text-align: left; 
              font-size: 11px; 
              font-weight: 700; 
              text-transform: uppercase; 
              color: #666; 
              letter-spacing: 1px;
            }
            .items-table td { 
              padding: 16px 10px; 
              border-bottom: 1px solid #EFEAE2; 
              font-size: 13px; 
              color: #2D2D2D;
            }
            .summary-section { 
              display: flex; 
              flex-direction: column; 
              align-items: flex-end; 
              gap: 12px; 
              margin-top: 15px;
            }
            .summary-row { 
              display: flex; 
              justify-content: space-between; 
              width: 320px; 
              font-size: 13px; 
              color: #555;
            }
            .summary-row strong {
              color: #1A1A1A;
            }
            .grand-total { 
              font-size: 18px; 
              font-weight: 700; 
              color: #8A1B5E; 
              border-top: 2px solid #8A1B5E; 
              padding-top: 12px; 
              margin-top: 8px; 
            }
            .grand-total span {
              font-family: 'Playfair Display', serif;
              font-size: 20px;
              font-weight: 800;
            }
            .footer-note { 
              text-align: center; 
              margin-top: 60px; 
              font-size: 11px; 
              color: #9A8A78; 
              border-top: 1px solid #EFEAE2; 
              padding-top: 25px; 
            }
            @media print {
              body { padding: 20px; }
              .invoice-wrapper { border: none; box-shadow: none; padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-wrapper">
            <div class="invoice-header">
              <div class="brand-section">
                <h1>VIVE</h1>
                <p>Sacred Botanical Remedies</p>
              </div>
              <div class="meta-section">
                <div class="invoice-title">Tax Invoice</div>
                <p class="meta-text">Invoice No: <strong>${uniqueInvoiceNo}</strong></p>
                <p class="meta-text">Order Ref: <strong>${orderDetails.orderNumber}</strong></p>
                <p class="meta-text">Date: <strong>${todayDate}</strong></p>
              </div>
            </div>

            <div class="info-grid">
              <div class="info-box">
                <div class="section-title">Billed To</div>
                <p><strong>${orderDetails.name}</strong></p>
                <p>${orderDetails.email}</p>
                <p>Phone: ${orderDetails.phone || 'Captured via Razorpay'}</p>
              </div>
              <div class="info-box">
                <div class="section-title">Shipping Address</div>
                <p>${orderDetails.address}</p>
              </div>
            </div>

            <table class="items-table">
              <thead>
                <tr>
                  <th style="width: 70%;">Item Description</th>
                  <th style="text-align: right; width: 30%;">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Sacred Botanical Formulation Package</strong><br>
                    <span style="font-size: 11px; color: #777;">Premium skincare & wellness remedies custom formulated by VIVE</span>
                  </td>
                  <td style="text-align: right; font-weight: 600;">₹${orderDetails.totalPayable.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>

            <div class="summary-section">
              <div class="summary-row">
                <span>Subtotal</span>
                <strong>₹${orderDetails.totalPayable.toLocaleString()}</strong>
              </div>
              <div class="summary-row">
                <span>Taxes & GST</span>
                <strong style="color: #9A8A78; font-size: 11px; text-transform: uppercase;">Inclusive</strong>
              </div>
              <div class="summary-row">
                <span>Payment Mode</span>
                <strong>${orderDetails.paymentMethod || 'Razorpay Prepaid'}</strong>
              </div>
              <div class="summary-row grand-total">
                <span>Grand Total</span>
                <span>₹${orderDetails.totalPayable.toLocaleString()}</span>
              </div>
            </div>

            <div class="footer-note">
              <p>Thank you for embarking on VIVE's sacred self-care journey.</p>
              <p style="margin-top: 5px; font-size: 9px; color: #BBB;">This is a digitally generated tax invoice valid for all records and does not require a physical signature.</p>
            </div>
          </div>

          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-6">
          <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center text-brand-magenta shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-serif font-bold text-brand-dark">No Order Details Found</h2>
            <p className="text-sm text-gray-500">You may have landed here by mistake. Browse our sacred formulations to place your first order.</p>
          </div>
          <Link to="/" className="px-8 py-3.5 bg-brand-magenta text-white text-[11px] font-bold uppercase tracking-wider rounded-full hover:bg-brand-dark transition-all">
            Explore Formulations
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans relative">
      <Navbar />

      <main className="flex-1 max-w-[1300px] mx-auto px-4 sm:px-10 lg:px-16 pt-4 pb-16 md:pt-6 md:pb-20 w-full relative z-10">
        {/* Bounded glowing luxury radial spots to prevent horizontal scroll alignment issues */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-150px] left-[-150px] w-96 h-96 rounded-full bg-brand-cream/45 filter blur-3xl opacity-80 animate-pulse"></div>
          <div className="absolute bottom-[-150px] right-[-150px] w-96 h-96 rounded-full bg-brand-magenta/5 filter blur-3xl opacity-70"></div>
        </div>

        {/* Upgraded Split Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch relative">
          
          {/* LEFT COLUMN: THE CONGRATULATORY ARTWORK (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8 bg-white/70 backdrop-blur-md rounded-[32px] border border-brand-gold/25 p-8 md:p-12 shadow-[0_15px_50px_rgba(0,0,0,0.015)] relative">
            {/* Elegant corner brackets */}
            <div className="absolute top-6 left-6 w-6 h-6 border-t border-l border-brand-gold/25 rounded-tl-lg"></div>
            <div className="absolute top-6 right-6 w-6 h-6 border-t border-r border-brand-gold/25 rounded-tr-lg"></div>
            
            <div className="space-y-6 text-left">
              {/* Premium Glowing Success Seal */}
              <div className="w-20 h-20 bg-brand-cream border border-brand-gold/20 rounded-full flex items-center justify-center text-brand-magenta shadow-xs relative">
                <span className="absolute inset-1.5 border border-dashed border-brand-gold/30 rounded-full animate-spin-slow"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-brand-magenta relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-magenta block">Order Successful</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-brand-dark leading-tight">
                  Thank you for <br />
                  your <span className="text-brand-magenta italic font-normal">purchase</span>
                </h2>
                <p className="text-[13px] text-gray-500 leading-relaxed max-w-md">
                  Your self-care journey has officially commenced. We have successfully registered your payment and are hand-blending your custom botanical remedies with the utmost love and precision.
                </p>
              </div>
            </div>

            {/* Quick Actions (Vibrant Layout) */}
            <div className="space-y-4 pt-6 border-t border-brand-gold/20 text-left">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Order Management</h4>
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Print Invoice Button */}
                <button 
                  onClick={handleDownloadInvoice}
                  className="flex-1 py-4 bg-[#8A1B5E] hover:bg-brand-dark text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#8A1B5E]/10 hover:shadow-[#8A1B5E]/20 cursor-pointer font-sans active:scale-98"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Invoice</span>
                </button>

                <Link 
                  to="/account"
                  className="flex-1 py-4 border border-gray-200 hover:border-brand-magenta/30 hover:bg-brand-cream/10 text-brand-dark text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl text-center transition-all flex items-center justify-center cursor-pointer active:scale-98"
                >
                  Track in Account
                </Link>
              </div>

              <Link 
                to="/" 
                className="block w-full py-3.5 border border-dashed border-gray-300 hover:border-brand-magenta/40 text-gray-600 hover:text-brand-magenta text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl text-center transition-all"
              >
                Return to Boutique Shop
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: THE BOTANICAL SCROLL (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-[32px] border border-brand-gold/25 shadow-[0_20px_60px_rgba(138,27,94,0.025)] overflow-hidden flex flex-col justify-between relative">
            
            {/* Voucher Upper Section */}
            <div className="p-8 md:p-10 pb-6 border-b border-dashed border-brand-gold/35 relative">
              {/* Tear-off Ticket Sideway Semi-circles */}
              <div className="absolute bottom-[-10px] left-[-10px] w-5 h-5 bg-[#FAF8F5] border-r border-brand-gold/25 rounded-full z-10"></div>
              <div className="absolute bottom-[-10px] right-[-10px] w-5 h-5 bg-[#FAF8F5] border-l border-brand-gold/25 rounded-full z-10"></div>

              <div className="flex justify-between items-center text-xs mb-6">
                <span className="text-brand-dark/70 font-bold uppercase tracking-wider">Tax Invoice Reference</span>
                <span className="font-display font-extrabold tracking-widest text-brand-dark text-sm bg-brand-cream/40 px-3 py-1 rounded-full">{orderDetails.orderNumber}</span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-brand-gold/20 pb-4">
                  <div className="text-left">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">Grand Total Paid</span>
                    <span className="font-display font-black text-brand-magenta text-2xl">₹{orderDetails.totalPayable.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">Payment Method</span>
                    <span className="font-bold text-brand-dark text-xs uppercase tracking-wider bg-green-50 text-green-700 px-2.5 py-1 rounded-md">{orderDetails.paymentMethod || 'Razorpay'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 text-left pt-2">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Customer Details</span>
                    <p className="font-bold text-brand-dark text-xs leading-normal">{orderDetails.name}</p>
                    <p className="text-[11px] text-gray-500 leading-normal mt-0.5">{orderDetails.email}</p>
                    <p className="text-[10px] text-gray-400 leading-normal mt-0.5">{orderDetails.phone || 'Captured'}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Delivery Address</span>
                    <p className="text-brand-dark text-[11px] leading-relaxed font-medium">{orderDetails.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Voucher Lower Section */}
            <div className="p-8 md:p-10 pt-6 space-y-4 bg-[#FCFAF7]">
              <div className="bg-brand-cream/50 border border-brand-gold/15 rounded-2xl p-4 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5 text-left">
                  <span className="text-xl">✨</span>
                  <div>
                    <h4 className="text-[12px] font-extrabold text-brand-dark uppercase tracking-wider">VIVE Loyalty Ritual</h4>
                    <p className="text-[11px] text-brand-dark/70 font-medium">Points added to your sacred balance</p>
                  </div>
                </div>
                <span className="text-[15px] font-black text-brand-magenta">+{orderDetails.loyaltyPointsEarned} PTS</span>
              </div>

              <div className="text-[10.5px] text-gray-400 leading-relaxed text-left border-t border-brand-gold/20 pt-4">
                A digital confirmation email and a detailed PDF tax receipt have been automatically dispatched to your mailbox at <span className="font-semibold text-brand-dark">{orderDetails.email}</span>. Please preserve your Order reference number for any future ritual updates or shipping tracking inquiries.
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderSuccess;
