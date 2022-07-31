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

function MainWebView() {
  const { width, height } = useWindowDimensions();
  const webRef = useRef<WebView | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [cangoBack, setCangoBack] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: !showVideo });
    if (showVideo) {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
    }
    // }
  }, [showVideo]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () =>
        cangoBack ? (
          <NavigationLeftButton onPress={() => webRef.current?.goBack()} />
        ) : null,
    });
  }, [cangoBack]);

  return (
    <WebView
      style={[{ width, height: height }]}
      allowsInlineMediaPlayback={true}
      // mixedContentMode={"compatibility"}
      mixedContentMode={"always"}
      allowsFullscreenVideo
      javaScriptEnabled={true}
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
        navigation.setOptions({ title: res.title });
        setCangoBack(res.canGoBack);
        setVideoUrl(res.url);
        fetch(res.url)
          .then((res) => res.text())
          .then((text) => {
            if (
              text.indexOf("schema.org/VideoObject") > -1 &&
              (res.url.startsWith("https://www.iqiyi.com/v_") ||
                res.url.startsWith("https://m.iqiyi.com/v_"))
            ) {
              webRef.current?.injectJavaScript(runFirst);
              webRef.current?.injectJavaScript(replaceVideo);
              webRef.current?.injectJavaScript(biddenFullScreen);
              setTimeout(() => {
                webRef.current?.injectJavaScript(addListener);
              }, 2000);
            }
          })
          .catch((err) => {});
      }}
      onShouldStartLoadWithRequest={(res) => {
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
      source={{ uri: "https://www.iqiyi.com/" }}
      onMessage={(src) => {
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

export default MainWebView;
