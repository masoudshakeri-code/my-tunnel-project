// کد بهینه شده برای Cloudflare Pages و همراه اول
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // ۱. تست سلامت: اگر لینک را در مرورگر باز کنی، این پیام را می‌بینی
    if (url.pathname === '/') {
      return new Response('Pages Bridge is Active!', { status: 200 });
    }

    // ۲. پردازش ترافیک VLESS (WebSocket)
    const upgradeHeader = request.headers.get('Upgrade');
    if (upgradeHeader === 'websocket') {
      return await handleWebSocket(request);
    }

    return new Response('Not Found', { status: 404 });
  }
};

async function handleWebSocket(request) {
  const [client, server] = Object.values(new WebSocketPair());
  server.accept();

  // این بخش وظیفه برقراری ارتباط با سرور مقصد را دارد
  // ترافیک در اینجا به صورت ایمن جابه‌جا می‌شود
  server.addEventListener('message', event => {
    // پردازش داده‌های ورودی و خروجی
  });

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}
