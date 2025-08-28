let replaceCover = (u) => {
    if (u.startsWith("https://")) u = u.substring(8)
    else u = u.substring(7)
    let uArr = u.split("/")
    uArr[0] = "https://p6-novel.byteimg.com/origin"
    let uArr2 = []
    uArr.forEach((x) => {
        if (!x.includes("?") && !x.includes("~")) uArr2.push(x)
        else uArr2.push(x.split("~")[0])
    })
    u = uArr2.join("/")
    return u
}

let detail_url = "https://api5-normal-lf.fqnovel.com/reading/bookapi/multi-detail/v/?aid=1967&iid=1&version_code=999&book_id=";

let cheaper_url = "/api/xiaoshuo/fanqie?mulu=";

let api = "https://api.xcvts.cn";


function getUrl(key, page) {
	   const api = "https://novel.snssdk.com";
	   const action = "/api/novel/channel/homepage/search/search/v1/?device_platform=android&parent_enterfrom=novel_channel_search.tab.&";
	   const param = `offset=${page}&aid=1967&q=${key}`;
	   const search = api + action + param;
    return search;
 }

function getA_ContentUrl(item_id) {
	    let x_Capi = api + "/api/xiaoshuo/fanqie?content=";
	    return x_Capi + item_id
	}
function getB_ContentUrl(item_id) {
	    const j_Capi = "http://nuu2.jingluo.love";
	    return j_Capi + "/content?item_id=" + item_id
	}

function getComic(result) {
  let mat = result.match(/<article>([\s\S]*?)<\/article>/);
  try {
    let cnt = JSON.parse(
      mat
        ? mat[1].replace(/\&/g, '"').replace(/\;/g, "").replace(/\#34/g, "")
        : result
    );
    return (mat ? cnt.skeleton.data : cnt.picInfos)
      .map((i) => {
        let path = mat
          ? cnt.materials[i.element_name].data.web_uri
          : "novel-pic/" + i.md5;
        return `<img src="https://p3-novel.byteimg.com/origin/${path}">`;
      })
      .join("<br>");
  } catch (e) { // not comic content
    mat = result.match(/<body>([\s\S]*?)<\/body>/)
    // java.log(result)
    return (mat ? mat[1] : result).toString().replace(/\<\!DOCTYPE html.*/g, "").replace(/\<tt_keyword_ad.*\<\/tt_keyword_ad\>/, "").replace(/\<a epub.*\>\<\/a\>/g, "")
  }
}
function getContent(content) {
    let purified = content.replace(/<img[^>]*src="([^"]*)"[^>]*>/g, '<img src="$1">');
    
    let segments = [];
    let currentSegment = '';
    let inImg = false;
    let imgBuffer = '';

    for (let i = 0; i < purified.length; i++) {
        let char = purified[i];
        
        if (char === '<' && purified.substring(i, i + 4) === '<img') {
            if (currentSegment.trim()) {
                segments.push(currentSegment.trim());
                currentSegment = '';
            }
            inImg = true;
            imgBuffer = char;
        } else if (inImg) {
            imgBuffer += char;
            if (char === '>') {
                segments.push(imgBuffer);
                imgBuffer = '';
                inImg = false;
            }
        } else if (char === ' ') {
            if (currentSegment.trim()) {
                segments.push(currentSegment.trim());
                currentSegment = '';
            }
        } else {
            currentSegment += char;
        }
    }

    if (currentSegment.trim()) {
        segments.push(currentSegment.trim());
    }
    if (imgBuffer) {
        segments.push(imgBuffer);
    }

    return segments.join('\n');
}

getHost = (a, b, c, d) => [
    ["https://"][0],
    [
        "reading",
        "api",
        "api3",
        "api5",
        "novel",
        "",
    ][(a == 4 ? 5 : b) || 0],
    [
        "",
        "-normal",
    ][c || 0],
    [
        "",
        "-hl",
        "-lf",
        "-lq",
        "-sinfonlinea",
        "-sinfonlineb",
        "-sinfonlinec",
    ][d || 0],
    [".", ""][a == 4 ? 1 : 0],
    [
        "snssdk",
        "fqnovel",
        "fanqiesdk",
        "toutiaoapi",
        "fanqienovel",
    ][a || 0],
    [".com"][0],
].join("");
javaImport = new JavaImporter()
javaImport.importPackage(
    Packages.okhttp3,
    Packages.cn.hutool.core.util,
    Packages.cn.hutool.core.codec,
    Packages.cn.hutool.crypto.digest
)
function xGorgon(path, params, data, ck) {
    const { java, source } = this;
    params = [
        params,
        "aid=1967",
        "channel=0",
        "os_version=0",
        "app_name=novelapp",
        "version_code=58932",
        "device_platform=android",
        "device_type=unknown",
    ].join("&").split("&").sort().join("&").replace(/^&+/, "");
    
    if (!data) {
        path = "/reading/bookapi/" + path + "/v/?";
    }
    
    let url = getHost() + path + params;
    let devtype;
    for (let i of (source.getLoginHeader() || '').split('&')) {
        if (i.startsWith('device_type')) {
            devtype = i.split('=')[1];
        }
    }
    let md5 = (str) => javaImport.DigestUtil.md5Hex(str);
    let rStr = (str) => javaImport.StrUtil.reverse(str);
    let Hex = (num) => num.toString(16).padStart(2, "0");
    let rHex = (num) => parseInt(rStr(Hex(num)), 16);
    function rBin(num) {
        let bin = num.toString(2).padStart(8, "0");
        return parseInt(rStr(bin), 2);
    }
    function getHex(ck) {
        let hex = md5(params);
        hex += data ? md5(data) : "0".repeat(8);
        hex += ck ? md5(ck) : "0".repeat(8);
        return hex;
    }

    function calculate(hex, ck) {
        let len = 0x14;
        let key = [0xDF, 0x77, 0xB9, 0x40, 0xB9, 0x9B, 0x84, 0x83, 0xD1, 0xB9, 0xCB, 0xD1, 0xF7, 0xC2, 0xB9, 0x85, 0xC3, 0xD0, 0xFB, 0xC3];
        let paramList = [];
        
        for (let i = 0; i < 9; i += 4) {
            let temp = hex.substring(8 * i, 8 * (i + 1));
            for (let j = 0; j < 4; j++) {
                let h = parseInt(temp.substring(j * 2, (j + 1) * 2), 16);
                paramList.push(h);
            }
        }
        
        paramList.push(0x0, 0x6, 0xB, 0x1C);
        let T = Math.floor(Date.now() / 1000);
        paramList.push((T >> 24) & 0xFF, (T >> 16) & 0xFF, (T >> 8) & 0xFF, T & 0xFF);
        let eorResultList = [];
        for (let i = 0; i < paramList.length; i++) {
            eorResultList.push(paramList[i] ^ key[i % len]);
        }
        
        for (let A, B, C, D, i = 0; i < len; i++) {
            A = rHex(eorResultList[i]);
            B = eorResultList[(i + 1) % len];
            C = rBin(A ^ B);
            D = ((C ^ 0xFFFFFFFF) ^ len) & 0xFF;
            eorResultList[i] = D;
        }
        
        let result = "";
        for (let param of eorResultList) {
            result += Hex(param);
        }
        
        let option = {
            "headers": {
                "X-Khronos": String(T),
                "X-Gorgon": "0404b0d30000" + result,
                "User-Agent": 'com.dragon.read',
                "Cookie": ck ? ck : ""
            }
        };
        
        if (data) {
            let json = javaImport.MediaType.parse("application/json");
            let request = new javaImport.Request.Builder()
                .url(url)
                .post(javaImport.RequestBody.create(data, json));
                
            for (let n in option.headers) {
                request.addHeader(n, option.headers[n]);
            }
            
            let client = new javaImport.OkHttpClient();
            let response = client.newCall(request.build()).execute();
            return JSON.parse(response.body().string()).data;
        } else {
            return url + "," + JSON.stringify(option);
        }
    }
    
    return calculate(getHex(ck), ck);
}
function getBookId(url) {
    const {java} = this;
    let $ = JSON.parse(url).data;
    let arr;
    
    if ($.book_shelf_info && $.book_shelf_info.length > 0) {
        arr = $.book_shelf_info.map($ => $.book_id);
    } else if ($.data_list && $.data_list.length > 0) {
        arr = $.data_list.map($ => $.book_id_str);
    } else {
        java.toast("获取 book_id 失败，你可能需要登录！");
        return [];
    }
    
    return arr.slice(0, 100);
}
function splitArray(input, size) {
    const output = [];
    for (let i = 0; i < input.length; i += size) {
        output.push(input.slice(i, i + size));
    }
    return output;
}