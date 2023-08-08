import { session } from 'electron';

// const filter = {
//   urls: ['*.hdslb.com/*'],
// };
// session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, cb) => {
//   console.log(details);
//   details.requestHeaders['referer'] = 'https://www.baidu.com';
//   let data = { requestHeaders: details.requestHeaders };
//   cb(data);
// });

export function setCors() {
  // const filter = {
  //   urls: [
  //     '*://*.saastest.itjyun.com/*',
  //     '*://*.saaspre.jnshiyanqu.cn/*',
  //     '*://*.www.jnshiyanqu.cn/*',
  //     '*://*.jnshiyanqu.cn/*',
  //   ],
  // };

  // session.defaultSession.webRequest.onHeadersReceived(filter, (details, callback) => {
  //   details.responseHeaders!['Access-Control-Allow-Origin'] = ['*'];
  //   callback({ responseHeaders: details.responseHeaders });
  // });

  // https://pratikpc.medium.com/bypassing-cors-with-electron-ab7eaf331605

  function UpsertKeyValue(obj: any, keyToChange: any, value: any) {
    const keyToChangeLower = keyToChange.toLowerCase();
    for (const key of Object.keys(obj)) {
      if (key.toLowerCase() === keyToChangeLower) {
        // Reassign old key
        obj[key] = value;
        // Done
        return;
      }
    }
    // Insert at end instead
    obj[keyToChange] = value;
  }

  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    const { requestHeaders } = details;
    UpsertKeyValue(requestHeaders, 'Access-Control-Allow-Origin', ['*']);
    requestHeaders['referer'] = 'https://saaspre.jnshiyanqu.cn';
    callback({ requestHeaders });
  });

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const { responseHeaders } = details;
    UpsertKeyValue(responseHeaders, 'Access-Control-Allow-Origin', ['*']);
    UpsertKeyValue(responseHeaders, 'Access-Control-Allow-Headers', ['*']);
    callback({
      responseHeaders,
    });
  });
}
