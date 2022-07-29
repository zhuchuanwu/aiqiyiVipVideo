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
ifrm.setAttribute("allowfullscreen", false);
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
window.ReactNativeWebView.postMessage("success");
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
  // useEffect(() => {
  //   if (webRef.current) {
  //     setInterval(() => {
  //       webRef.current?.injectJavaScript(replaceVideo);
  //     }, 1000);
  //   }
  // }, [webRef.current]);

  return (
    <View style={[{ width, height: height - 50 }]}>
      <WebView
        // injectedJavaScript={runFirst}
        ref={webRef}
        onLoadEnd={() => {
          webRef.current?.injectJavaScript(runFirst);
        }}
        setSupportMultipleWindows={false}
        onNavigationStateChange={(res) => {
          webRef.current?.injectJavaScript(runFirst);
          navigation.setOptions({ title: res.title });
          setCangoBack(res.canGoBack);
          fetch(res.url)
            .then((res) => res.text())
            .then((text) => {
              console.log("====================================");
              console.log(text);
              console.log("====================================");
              if (
                text.indexOf("schema.org/VideoObject") > -1 &&
                (res.url.startsWith("https://www.iqiyi.com/v_") ||
                  res.url.startsWith("https://m.iqiyi.com/v_"))
              ) {
                // setVideoUrl("https://okjx.cc/?url=" + res.url);
                // alert("https://okjx.cc/?url=" + res.url);
                // console.log("https://okjx.cc/?url=" + res.url);
                webRef.current?.injectJavaScript(runFirst);
                webRef.current?.injectJavaScript(replaceVideo);
                // setShowVideo(true);
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
          // alert("成功");
        }}
      />

      {showVideo && (
        <View
          style={[
            { width, height, position: "absolute" },
            t.absolute,
            t.top0,
            t.left0,
            t.right0,
            t.bottom0,
          ]}
        >
          <WebView source={{ uri: videoUrl }} />
          <View
            style={[
              t.absolute,
              t.pX3,
              t.pY2,
              t.bgBlack,
              t.right0,
              t.mT8,
              t.mR2,
              t.flexRow,
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                webRef.current?.reload();
              }}
            >
              <Text style={[t.textWhite]}>重试</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowVideo(false);
              }}
              style={[t.mL4]}
            >
              <Text style={[t.textWhite]}>关闭</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

export default MainWebView;
