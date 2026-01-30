import { useState, useEffect, useMemo } from 'react';
import { X, Minus, Plus, Trash2, Clock, MessageSquare, CreditCard, Wallet, Smartphone, CheckCircle, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/lib/cartStore';
import { toast } from 'sonner';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomerInfo {
  name: string;
  phone: string;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, pickupTime, notes, updateQuantity, removeItem, setPickupTime, setNotes, clearCart, getTotal } = useCart();
  const [step, setStep] = useState<'cart' | 'checkout' | 'payment' | 'confirmation'>('cart');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: ''
  });
  const [orderNumber, setOrderNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'in-store' | 'online' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const generateTimeSlots = () => {
    const slots: { time: string; display: string }[] = [];
    const now = new Date(currentTime);
    const prepMinutes = 30;
    const interval = 15;
    const openingHour = 8;
    const closingHour = 24;
    
    let startTime = new Date(now.getTime() + prepMinutes * 60000);
    startTime.setMinutes(
      Math.ceil(startTime.getMinutes() / interval) * interval,
      0,
      0
    );
    
    if (startTime.getHours() < openingHour) {
      startTime.setHours(openingHour, 0, 0, 0);
    }
    
    const endTimeToday = new Date();
    endTimeToday.setHours(closingHour, 0, 0, 0);
    
    const tempTime = new Date(startTime);
    while (tempTime <= endTimeToday) {
      const hours = tempTime.getHours();
      const minutes = tempTime.getMinutes();
      
      const displayHours = hours % 12 || 12;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayTime = `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      const valueTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
      slots.push({ time: valueTime, display: displayTime });
      tempTime.setMinutes(tempTime.getMinutes() + interval);
    }
    
    if (slots.length < 4) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(openingHour, 0, 0, 0);
      
      const endTimeTomorrow = new Date(tomorrow);
      endTimeTomorrow.setHours(closingHour, 0, 0, 0);
      
      tempTime.setTime(tomorrow.getTime());
      
      while (tempTime <= endTimeTomorrow && slots.length < 20) {
        const hours = tempTime.getHours();
        const minutes = tempTime.getMinutes();
        
        const displayHours = hours % 12 || 12;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayTime = `Tomorrow ${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        const valueTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        
        slots.push({ time: valueTime, display: displayTime });
        tempTime.setMinutes(tempTime.getMinutes() + interval);
      }
    }
    
    return slots.slice(0, 16);
  };

  const timeSlots = useMemo(() => generateTimeSlots(), [currentTime]);

  const formatSelectedTime = (time: string) => {
    const slot = timeSlots.find(s => s.time === time);
    return slot ? slot.display : time;
  };

  const generateOrderNumber = () => {
    return `AM${Date.now().toString().slice(-6)}`;
  };

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setStep('checkout');
  };

  const handleProceedToPayment = () => {
    if (!pickupTime) {
      toast.error('Please select a pickup time');
      return;
    }
    
    if (!customerInfo.name || !customerInfo.phone) {
      toast.error('Please provide your name and phone number');
      return;
    }
    
    setStep('payment');
  };

  const handleInStorePayment = () => {
    setIsProcessing(true);
    
    // Generate order number
    const newOrderNumber = generateOrderNumber();
    setOrderNumber(newOrderNumber);
    
    // Simulate processing
    setTimeout(() => {
      // Create order summary for print/display
      const orderSummary = {
        orderNumber: newOrderNumber,
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        pickupTime: formatSelectedTime(pickupTime),
        items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity
        })),
        notes: notes,
        total: getTotal(),
        paymentMethod: 'Pay at Pickup',
        orderTime: new Date().toLocaleTimeString()
      };
      
      // Save to localStorage for receipt printing
      localStorage.setItem('lastOrder', JSON.stringify(orderSummary));
      
      // Show success
      toast.success('Order Placed! 🎉', {
        description: `Order #${newOrderNumber} confirmed for ${formatSelectedTime(pickupTime)}`,
        duration: 5000,
      });
      
      setStep('confirmation');
      setIsProcessing(false);
    }, 1000);
  };

  const handleOnlinePayment = () => {
    setIsProcessing(true);
    
    // For now, we'll simulate online payment
    // In the future, she can add Stripe/PayPal here
    setTimeout(() => {
      const newOrderNumber = generateOrderNumber();
      setOrderNumber(newOrderNumber);
      
      toast.success('Online Payment Coming Soon!', {
        description: `For now, please pay in store. Order #${newOrderNumber} saved.`,
        duration: 5000,
      });
      
      // Revert to in-store payment
      handleInStorePayment();
      setIsProcessing(false);
    }, 1500);
  };

  const handlePrintReceipt = () => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (!lastOrder) return;
    
    const order = JSON.parse(lastOrder);
    
    const receiptContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Café Preview - Receipt</title>
        <style>
          body { font-family: 'Courier New', monospace; padding: 20px; max-width: 300px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 20px; }
          .header h1 { font-size: 24px; margin: 0; color: #8B4513; }
          .header p { margin: 5px 0; color: #666; }
          .divider { border-top: 2px dashed #333; margin: 15px 0; }
          .item { display: flex; justify-content: space-between; margin: 5px 0; }
          .total { font-weight: bold; font-size: 18px; margin-top: 10px; }
          .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          .note { margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 5px; }
          @media print {
            body { max-width: 100%; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>☕ Café Preview</h1>
          <p>Order Receipt</p>
          <p>Order #: ${order.orderNumber}</p>
          <p>${order.orderTime}</p>
        </div>
        
        <div class="divider"></div>
        
        <p><strong>Customer:</strong> ${order.customerName}</p>
        <p><strong>Phone:</strong> ${order.customerPhone}</p>
        <p><strong>Pickup Time:</strong> ${order.pickupTime}</p>
        
        <div class="divider"></div>
        
        <h3>Order Items:</h3>
        ${order.items.map(item => `
          <div class="item">
            <span>${item.quantity}x ${item.name}</span>
            <span>$${(item.total).toFixed(2)}</span>
          </div>
        `).join('')}
        
        <div class="divider"></div>
        
        ${order.notes ? `
          <div class="note">
            <strong>Notes:</strong> ${order.notes}
          </div>
        ` : ''}
        
        <div class="item total">
          <span>TOTAL</span>
          <span>$${order.total.toFixed(2)}</span>
        </div>
        
        <p><strong>Payment:</strong> ${order.paymentMethod}</p>
        
        <div class="divider"></div>
        
        <div class="footer">
          <p>Thank you for your order! ❤️</p>
          <p>Please bring this receipt when picking up</p>
          <p>☎️ (555) 123-4567</p>
        </div>
        
        <div class="no-print" style="margin-top: 20px; text-align: center;">
          <button onclick="window.print()" style="padding: 10px 20px; background: #8B4513; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Print Receipt
          </button>
          <button onclick="window.close()" style="padding: 10px 20px; margin-left: 10px; background: #666; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Close
          </button>
        </div>
      </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(receiptContent);
    printWindow.document.close();
  };

  const handleCompleteOrder = () => {
    clearCart();
    setCustomerInfo({ name: '', phone: '' });
    setNotes('');
    setPickupTime('');
    setPaymentMethod(null);
    setStep('cart');
    onClose();
  };

  const handleSendToInstagram = () => {
    // Build Instagram DM message
    const orderItems = items.map(item => 
      `${item.quantity}x ${item.name}`
    ).join(', ');
    
    const message = `New website order!%0A%0A` +
      `Order #: ${orderNumber}%0A` +
      `Name: ${customerInfo.name}%0A` +
      `Phone: ${customerInfo.phone}%0A` +
      `Pickup: ${formatSelectedTime(pickupTime)}%0A` +
      `Items: ${orderItems}%0A` +
      `Total: $${getTotal().toFixed(2)}%0A` +
      `Notes: ${notes || 'None'}%0A` +
      `Payment: Pay at pickup`;
    
    // Open Instagram (she can use this to forward to her business account)
    const instagramUrl = `https://www.instagram.com/direct/new/?text=${message}`;
    window.open(instagramUrl, '_blank');
    
    toast.info('Instagram opened', {
      description: 'Order details copied. Send to your business account.',
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background shadow-2xl z-50 flex flex-col animate-scale-in">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold text-accent">
            {step === 'cart' ? 'Your Order' : 
             step === 'checkout' ? 'Checkout' : 
             step === 'payment' ? 'Payment' : 
             'Order Confirmed!'}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 text-accent" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'cart' ? (
            <>
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Your cart is empty</p>
                  <Button variant="outline" onClick={onClose}>
                    Browse Menu
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-card rounded-xl p-4 shadow-soft flex items-center gap-4"
                    >
                      <div className="flex-1">
                        <h4 className="font-bold text-accent">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 rounded-full bg-muted hover:bg-primary/30 flex items-center justify-center transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4 text-accent" />
                        </button>
                        <span className="w-8 text-center font-bold text-accent">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-muted hover:bg-primary/30 flex items-center justify-center transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4 text-accent" />
                        </button>
                      </div>
                      
                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-8 h-8 rounded-full hover:bg-destructive/10 flex items-center justify-center transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : step === 'checkout' ? (
            <div className="space-y-6">
              {/* Current Time */}
              <div className="bg-muted/30 rounded-xl p-4">
                <div className="text-sm text-muted-foreground">Current Time</div>
                <div className="text-lg font-semibold text-accent">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-semibold text-accent mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Your Name *
                    </label>
                    <Input
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      placeholder="John Doe"
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      placeholder="(555) 123-4567"
                      className="rounded-xl"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      We'll text you when your order is ready
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Pickup Time */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-accent mb-3">
                  <Clock className="w-4 h-4" />
                  Select Pickup Time *
                </label>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => setPickupTime(slot.time)}
                      className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                        pickupTime === slot.time
                          ? 'bg-primary text-primary-foreground shadow-pink'
                          : 'bg-muted text-muted-foreground hover:bg-primary/30'
                      }`}
                    >
                      <div>{slot.display.split(' ')[0]}</div>
                      <div className="font-bold">{slot.display.split(' ').slice(1).join(' ')}</div>
                    </button>
                  ))}
                </div>
                {pickupTime && (
                  <p className="text-sm text-accent">
                    <span className="font-semibold">Selected Time:</span> {formatSelectedTime(pickupTime)}
                  </p>
                )}
              </div>
              
              {/* Notes */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-accent mb-3">
                  <MessageSquare className="w-4 h-4" />
                  Special Instructions (Optional)
                </label>
                <Textarea
                  placeholder="E.g., extra hot, dairy-free, less ice..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="resize-none rounded-xl border-border focus:border-primary"
                  rows={3}
                />
              </div>
              
              {/* Order Summary */}
              <div className="bg-card rounded-xl p-4 shadow-soft">
                <h4 className="font-bold text-accent mb-3">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-muted-foreground">{item.quantity}x {item.name}</span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-border mt-2">
                    <div className="flex justify-between font-bold text-lg text-accent">
                      <span>Total</span>
                      <span>${getTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : step === 'payment' ? (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-card rounded-xl p-4 shadow-soft">
                <h4 className="font-bold text-accent mb-3">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pickup Time</span>
                    <span className="font-medium">{formatSelectedTime(pickupTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Customer</span>
                    <span className="font-medium">{customerInfo.name}</span>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="flex justify-between font-bold text-lg text-accent">
                      <span>Total Amount</span>
                      <span>${getTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment Options */}
              <div>
                <h3 className="text-lg font-semibold text-accent mb-4">Choose Payment Method</h3>
                <div className="space-y-3">
                  {/* Option 1: Pay in Store */}
                  <button
                    onClick={() => setPaymentMethod('in-store')}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                      paymentMethod === 'in-store'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      paymentMethod === 'in-store' ? 'bg-primary' : 'bg-muted'
                    }`}>
                      <Wallet className={`w-5 h-5 ${
                        paymentMethod === 'in-store' ? 'text-primary-foreground' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div className="text-left flex-1">
                      <h4 className="font-semibold text-accent">Pay at Pickup</h4>
                      <p className="text-sm text-muted-foreground">
                        Pay with cash or card when you collect your order
                      </p>
                    </div>
                    {paymentMethod === 'in-store' && (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    )}
                  </button>
                  
                  {/* Option 2: Online Payment */}
                  <button
                    onClick={() => setPaymentMethod('online')}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                      paymentMethod === 'online'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      paymentMethod === 'online' ? 'bg-primary' : 'bg-muted'
                    }`}>
                      <CreditCard className={`w-5 h-5 ${
                        paymentMethod === 'online' ? 'text-primary-foreground' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div className="text-left flex-1">
                      <h4 className="font-semibold text-accent">Pay Online</h4>
                      <p className="text-sm text-muted-foreground">
                        Secure payment with credit/debit card
                      </p>
                      <div className="inline-flex items-center gap-1 mt-1 px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                        <Smartphone className="w-3 h-3" />
                        Coming Soon
                      </div>
                    </div>
                    {paymentMethod === 'online' && (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    )}
                  </button>
                </div>
                
                {/* Note about payments */}
                <div className="mt-4 p-3 bg-muted/30 rounded-xl">
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>Pro tip:</strong> Choose "Pay at Pickup" for now. Online payments can be added later!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Confirmation Step */
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              
              <h3 className="text-2xl font-bold text-accent mb-2">Order Confirmed!</h3>
              <p className="text-muted-foreground mb-2">
                Thank you, {customerInfo.name}!
              </p>
              <p className="text-muted-foreground mb-8">
                Your order is being prepared ☕
              </p>
              
              {/* Order Details Card */}
              <div className="bg-card rounded-xl p-6 shadow-soft max-w-sm mx-auto mb-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Order Number</div>
                    <div className="text-xl font-bold text-accent">{orderNumber}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Pickup Time</div>
                      <div className="font-semibold text-accent">{formatSelectedTime(pickupTime)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Total</div>
                      <div className="font-bold text-lg text-accent">${getTotal().toFixed(2)}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground">Payment</div>
                    <div className="font-semibold text-accent flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      Pay at Pickup
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3 max-w-sm mx-auto">
                <Button
                  onClick={handlePrintReceipt}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print Receipt
                </Button>
                
                <Button
                  onClick={handleSendToInstagram}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Send to Instagram
                </Button>
                
                <Button
                  onClick={handleCompleteOrder}
                  variant="hero"
                  size="lg"
                  className="w-full"
                >
                  Start New Order
                </Button>
              </div>
              
              {/* Instructions */}
              <div className="mt-8 p-4 bg-muted/30 rounded-xl max-w-sm mx-auto">
                <h4 className="font-semibold text-accent mb-2">What's Next?</h4>
                <ul className="text-sm text-muted-foreground text-left space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">1.</span>
                    <span>Bring your order number when picking up</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">2.</span>
                    <span>Pay with cash or card at the counter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">3.</span>
                    <span>We'll text you if there are any changes</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        {items.length > 0 && step !== 'confirmation' && (
          <div className="p-6 border-t border-border bg-card">
            {/* Total */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-accent">Total</span>
              <span className="text-2xl font-bold text-accent">${getTotal().toFixed(2)}</span>
            </div>
            
            {/* Navigation Buttons */}
            {step === 'cart' ? (
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full" 
                onClick={handleProceedToCheckout}
              >
                Continue to Checkout
              </Button>
            ) : step === 'checkout' ? (
              <div className="space-y-3">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full" 
                  onClick={handleProceedToPayment}
                  disabled={!pickupTime || !customerInfo.name || !customerInfo.phone}
                >
                  Continue to Payment
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="w-full" 
                  onClick={() => setStep('cart')}
                >
                  Back to Cart
                </Button>
              </div>
            ) : (
              /* Payment Step Buttons */
              <div className="space-y-3">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full" 
                  onClick={paymentMethod === 'in-store' ? handleInStorePayment : handleOnlinePayment}
                  disabled={!paymentMethod || isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : paymentMethod === 'in-store' ? (
                    'Place Order (Pay Later)'
                  ) : (
                    'Pay Online Now'
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="w-full" 
                  onClick={() => setStep('checkout')}
                >
                  Back to Checkout
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;