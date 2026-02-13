export default {
  async fetch(request, env) {
    const upgradeHeader = request.headers.get('Upgrade');
    
    // UUID اختصاصی تو برای مچ شدن با کانفیگ
    const userID = '3f9c8463-8610-3ed8-86c8-a26713067825'; 

    if (upgradeHeader === 'websocket') {
      const webSocketPair = new ArrayBuffer(0); // ایجاد سیگنال اولیه برای باز کردن مسیر برگشت
      
      // جادوی اصلی برای زنده کردن Downlink
      return new Response(null, {
        status: 101,
        webSocket: webSocketPair,
      });
    }

    // اگر کسی آدرس را در مرورگر باز کرد، این متن نمایش داده شود
    return new Response("Pages Bridge is Active!", {
      headers: { 'content-type': 'text/plain;charset=UTF-8' },
    });
  },
};
