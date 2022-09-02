import { createParser, ErrorCode, TagType } from "htmljs-parser";
import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import WebView from "react-native-webview";
import { parse } from "node-html-parser";
import { t } from "react-native-tailwindcss";
import { useNavigation } from "@react-navigation/native";
import NavigationLeftButton from "./navigation/NavigationLeftButton/NavigationLeftButton";
import * as ScreenOrientation from "expo-screen-orientation";
import RightButton from "./components/RightButton";
import { useAppStore, useDropDown } from "./mobx";
import { observer } from "mobx-react";

const runFirst = `
function destroyIframe(){ 
    window.ReactNativeWebView.postMessage(window.location.href);
    var iframes = document.getElementsByTagName("iframe");
    for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        //把iframe指向空白页面，这样可以释放大部分内存。 
        iframe.src = 'about:blank'; 
        
        try{ 
            iframe.contentWindow.document.write(''); 
            iframe.contentWindow.document.clear(); 
        }catch(e){} 
        
        //把iframe从页面移除 
        iframe.parentNode.removeChild(iframe);
    }
    var imgs = document.getElementsByTagName("img");
    for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        if (img.src.indexOf(".gif") >0) {
            img.src = "";
        }
    }
    try {
        document.getElementsByClassName('cover')[0].style.width=0;
    } catch (error) {
        
    }
    try {
        document.getElementsByClassName('iqyGuide-content')[0].style.height=0;
    } catch (error) {
        
    }
    try {
        document.getElementsByClassName('iqyGuide-content')[0].hidden=0;
    } catch (error) {
        
    }
    try {
        document.getElementsByClassName('m-iqylink-guide')[0].hidden=true;
    } catch (error) {
        
    }
    try {
        document.getElementsByClassName('ChannelHomeBanner_HDVideo-img_1jtpo')[0].hidden=true;
    } catch (error) {
        
    }
    try {
        document.getElementsByName("m-recList")[0].hidden=true;
    } catch (error) {
        
    }
    try {
        document.getElementsByName("m-extendBar")[0].hidden=true;
    } catch (error) {
        
    }
    try {
        document.getElementById("open_app_iframe").remove();
    } catch (error) {
        
    }
    try {
       var as = document.getElementsByTagName("a");
         for (var i = 0; i < as.length; i++) {
            var a = as[i];
            if(a.getAttribute("down-app-android-url")){
                a.parentNode.removeChild(a);
            }
            if(a.innerHTML.indexOf("爱奇艺APP")>=0){
                a.parentNode.removeChild(a);
            }

            // a.parentNode.removeChild(a);
            
         }
    } catch (error) {
        
    }
    try {
        var as = document.getElementsByClassName('m-hotWords-bottom');
          for (var i = 0; i < as.length; i++) {
            var a = as[i];
            a.parentNode.removeChild(a);
             
          }
     } catch (error) {
         
     }
   
};
 destroyIframe();
`;

const replaceVideo = `
var ifrm = document.createElement("iframe");
ifrm.setAttribute("id", "ifrm"); // assign an id
// assign url
ifrm.setAttribute(
  "src",
  "https://okjx.cc/?url=" + window.location.href
);

ifrm.setAttribute("frameborder", "0");
ifrm.setAttribute("scrolling", "no");
ifrm.setAttribute("width", "100%");
ifrm.setAttribute("height", "100%");
ifrm.setAttribute("style", "display:block;");
ifrm.setAttribute("border", 0);
ifrm.setAttribute("position", "absolute");


document.getElementsByClassName("m-video-player-wrap")[0].style.paddingTop=0
document.getElementsByClassName("m-video-player-wrap")[0].style.height="350px"
for (let index = 0; index < document.getElementsByClassName("m-video-player-wrap")[0].children.length; index++) {
  let item = document.getElementsByClassName("m-video-player-wrap")[0].children[index];
  item.remove();
}
document.getElementsByClassName("m-video-player-wrap")[0].appendChild(ifrm);
//setVideo props，not allow fullscreen in ios

window.ReactNativeWebView.postMessage(JSON.stringify({"type":"notification","message":"success"}));
`;
const replaceMangguoVideo = `
var ifrm = document.createElement("iframe");
ifrm.setAttribute("id", "ifrm"); // assign an id
// assign url
ifrm.setAttribute(
  "src",
  "https://okjx.cc/?url=" + window.location.href
);

ifrm.setAttribute("frameborder", "0");
ifrm.setAttribute("scrolling", "no");
ifrm.setAttribute("width", "100%");
ifrm.setAttribute("height", "100%");
ifrm.setAttribute("style", "display:block;");
ifrm.setAttribute("border", 0);
ifrm.setAttribute("position", "absolute");


document.getElementsByClassName("video-area")[0].style.paddingTop=0
document.getElementsByClassName("video-area")[0].style.height="350px"
try {
  for (let index = 0; index < document.getElementsByClassName("video-area")[0].children.length; index++) {
    let item = document.getElementsByClassName("video-area")[0].children[index];
    item.remove();
  }
} catch (error) {
  
}
try {
  for (let index = 0; index < document.getElementsByClassName("video-area")[0].children.length; index++) {
    let item = document.getElementsByClassName("video-area")[0].children[index];
    item.remove();
  }
} catch (error) {
  
}
try {
  for (let index = 0; index < document.getElementsByClassName("video-area")[0].children.length; index++) {
    let item = document.getElementsByClassName("video-area")[0].children[index];
    item.remove();
  }
} catch (error) {
  
}
try {
  for (let index = 0; index < document.getElementsByClassName("video-area")[0].children.length; index++) {
    let item = document.getElementsByClassName("video-area")[0].children[index];
    item.remove();
  }
} catch (error) {
  
}
document.getElementsByClassName("video-area")[0].appendChild(ifrm);
try {
  document.getElementsByClassName("vip-play-popover vip-popover")[0].hidden=true
  document.getElementsByClassName("ad-banner")[0].hidden=true
  document.getElementsByClassName("mg-app-swip mg-app-swip-on ")[0].hidden=true
} catch (error) {
  
}

//setVideo props，not allow fullscreen in ios
window.ReactNativeWebView.postMessage(JSON.stringify({"type":"notification","message":"success"}));
`;

const replaceYoukuVideo = `
var ifrm = document.createElement("iframe");
ifrm.setAttribute("id", "ifrm"); // assign an id
// assign url
ifrm.setAttribute(
  "src",
  "https://okjx.cc/?url=" + window.location.href
);

ifrm.setAttribute("frameborder", "0");
ifrm.setAttribute("scrolling", "no");
ifrm.setAttribute("width", "100%");
ifrm.setAttribute("height", "100%");
ifrm.setAttribute("style", "display:block;");
ifrm.setAttribute("border", 0);
ifrm.setAttribute("position", "absolute");


document.getElementsByClassName("player-box")[0].style.paddingTop=0
document.getElementsByClassName("player-box")[0].style.height="350px"
try {
  for (let index = 0; index < document.getElementsByClassName("player-box")[0].children.length; index++) {
    let item = document.getElementsByClassName("player-box")[0].children[index];
    item.remove();
  }
} catch (error) {
  
}
try {
  for (let index = 0; index < document.getElementsByClassName("player-box")[0].children.length; index++) {
    let item = document.getElementsByClassName("player-box")[0].children[index];
    item.remove();
  }
} catch (error) {
  
}
try {
  for (let index = 0; index < document.getElementsByClassName("player-box")[0].children.length; index++) {
    let item = document.getElementsByClassName("player-box")[0].children[index];
    item.remove();
  }
} catch (error) {
  
}
try {
  for (let index = 0; index < document.getElementsByClassName("player-box")[0].children.length; index++) {
    let item = document.getElementsByClassName("player-box")[0].children[index];
    item.remove();
  }
} catch (error) {
  
}
document.getElementsByClassName("player-box")[0].appendChild(ifrm);
try {
  document.getElementsByClassName("clipboard h5-detail-guide")[0].hidden=true
  document.getElementsByClassName("clipboard h5-detail-vip-guide")[0].hidden=true
  document.getElementsByClassName("icon downloadApp")[0].hidden=true
  document.getElementsByClassName("mg-app-swip mg-app-swip-on ")[0].hidden=true
} catch (error) {
  
}

//setVideo props，not allow fullscreen in ios
window.ReactNativeWebView.postMessage(JSON.stringify({"type":"notification","message":"success"}));
`;
const getCurrentUrl = `
 window.ReactNativeWebView.postMessage(JSON.stringify({"message":{"url":window.location.href,"title":document.title},"type":"url"}));
`;

const biddenFullScreen = `
document.getElementById("lelevideo").setAttribute("x5-playsinline", "");
document.getElementById("lelevideo").setAttribute("playsinline", "");
document.getElementById("lelevideo").setAttribute("webkit-playsinline", "");`;

const addListener = `
var myyVideo = document.getElementById("lelevideo");
!myyVideo&&setInterval(() => {
  if (!myyVideo) {
   
    myyVideo = document.getElementById("lelevideo");
  }else{
    alert("找到你了")
  }
}, 1000);

document.getElementById("lelevideo").addEventListener("ended", function() {
  window.ReactNativeWebView.postMessage(JSON.stringify({"type":"notification","message":"ended"}));
})
`;
const INJECTED_JAVASCRIPT = `(function() {
  var open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function() {
      this.addEventListener("load", function() {
          console.log(this.request);
          var message = {"status" : this.status, "response" : this.response}
          window.ReactNativeWebView.postMessage(JSON.stringify(message));
      });
      open.apply(this, arguments);
  };})();`;
function MainWebView() {
  const { width, height } = useWindowDimensions();

  const webRef = useRef<WebView | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [cangoBack, setCangoBack] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const { setDropdown } = useDropDown();
  const { currentItem } = useAppStore();

  const navigation = useNavigation();
  // useEffect(() => {
  //   navigation.setOptions({ headerShown: !showVideo });
  //   if (showVideo) {
  //     ScreenOrientation.lockAsync(
  //       ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
  //     );
  //   } else {
  //     ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
  //   }
  //   // }
  // }, [showVideo]);
  // alert(JSON.stringify(currentItem));
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () =>
        cangoBack ? (
          <NavigationLeftButton onPress={() => webRef.current?.goBack()} />
        ) : null,
      headerRight: () => (
        <View style={[t.mR6]}>
          <RightButton
            title={currentItem.title}
            onPress={() => {
              debugger;
              setDropdown({
                position: { x: 0, y: 40 },
                directionY: "bottom",
                needDot: true,
                directionX: "left",
                title: "",
                show: true,
                needBg: true,
              });
            }}
          />
        </View>
      ),
    });
  }, [cangoBack, currentItem]);

  return (
    <WebView
      style={[{ width, height: height }]}
      allowsInlineMediaPlayback={true}
      // mixedContentMode={"compatibility"}
      mixedContentMode={"always"}
      allowsFullscreenVideo
      javaScriptEnabled={true}
      injectedJavaScript={INJECTED_JAVASCRIPT}
      ref={webRef}
      onLoadEnd={() => {
        webRef.current?.injectJavaScript(runFirst);
      }}
      onTouchEnd={() => {
        //安卓点击切换集数的时候 不走onNavigationStateChange，改用postmessage获取当前window href的方式
        if (Platform.OS === "android") {
          webRef.current?.injectJavaScript(getCurrentUrl);
        }
      }}
      onNavigationStateChange={(res) => {
        webRef.current?.injectJavaScript(runFirst);
        navigation.setOptions({
          title: res.title.length > 10 ? res.title.substring(0, 10) : res.title,
          headerLeft: () =>
            cangoBack ? (
              <NavigationLeftButton onPress={() => webRef.current?.goBack()} />
            ) : null,
        });
        fetch("http://localhost:3000/api/getVideoUrl?url=" + res.url);
        setCangoBack(res.canGoBack);
        setVideoUrl(res.url);
        webRef.current?.injectJavaScript(runFirst);
        webRef.current?.injectJavaScript(replaceVideo);
        webRef.current?.injectJavaScript(replaceMangguoVideo);
        webRef.current?.injectJavaScript(replaceYoukuVideo);
        webRef.current?.injectJavaScript(biddenFullScreen);
        setTimeout(() => {
          webRef.current?.injectJavaScript(addListener);
        }, 2000);
      }}
      onShouldStartLoadWithRequest={(res) => {
        console.log(res.url);

        //   webRef.current?.injectJavaScript(runFirst);
        if (res.url.indexOf("www.iqiyi.com/app") > -1) {
          return false;
        }
        if (res.url.indexOf("iqiyi://mobile") > -1) {
          return false;
        }
        if (res.url.startsWith("https:")) {
          return true;
        }
        return false;
      }}
      source={{ uri: currentItem.url }}
      onMessage={(src) => {
        console.log(src.nativeEvent.data);
        if (Platform.OS === "android") {
          try {
            const data = JSON.parse(src.nativeEvent.data);
            if (data.type === "url" && videoUrl !== data.message?.url) {
              setVideoUrl(data.message.url);
              webRef.current?.injectJavaScript(runFirst);
              webRef.current?.injectJavaScript(replaceVideo);
            }
          } catch (error) {}
        }
        try {
          const data = JSON.parse(src.nativeEvent.data);
          if (data.type === "notification" && data.message === "ended") {
            alert("结束");
          }
        } catch (error) {}
      }}
    />
  );
}

export default observer(MainWebView);
