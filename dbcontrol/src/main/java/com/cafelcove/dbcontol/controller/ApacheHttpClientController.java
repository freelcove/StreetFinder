// package com.cafelcove.dbcontol.controller;

// import java.io.BufferedReader;
// import java.io.InputStreamReader;
// import java.net.HttpURLConnection;
// import java.net.URL;
// import java.net.URLEncoder;

// import org.json.JSONArray;
// import org.json.JSONObject;
// import org.json.JSONTokener;
// // import org.json.simple.parser.JSONParser;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.cafelcove.streetfinder.dto.ApiInfo;


// @RestController
// @RequestMapping("api/test")
// public class ApacheHttpClientController {
	
// 	private String clientId = ApiInfo.naver_id;
// 	private String clientSecret = ApiInfo.naver_pw;
// 	private String apiURL = ApiInfo.naver_geocoding;

// 	@GetMapping(value = "/checkinfo")
// 	public String checkInfo(){
// 		return clientId + clientSecret;
// 	}

// 	// 주소 입력 -> 위도, 경도 좌표 추출.
//     @GetMapping(value = "controll/{variable}")
// 	public String checkPosition(@PathVariable String variable) {
// 		try {
// 			String address = variable;
// 			String addr = URLEncoder.encode(address, "UTF-8");
			
// 			// Geocoding 개요에 나와있는 API URL 입력.
// 			apiURL +=  addr;	// JSON
			
// 			URL url = new URL(apiURL);
// 			HttpURLConnection con = (HttpURLConnection) url.openConnection();
// 			con.setRequestMethod("GET");
			
// 			// Geocoding 개요에 나와있는 요청 헤더 입력.
// 			con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
// 			con.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);
			
// 			// 요청 결과 확인. 정상 호출인 경우 200
// 			int responseCode = con.getResponseCode();
			
// 			BufferedReader br;
			
// 			if (responseCode == 200) {
// 				br = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));
// 			} else {
// 				br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
// 			}
			
// 			String inputLine;
			
// 			StringBuffer response = new StringBuffer();
			
// 			while((inputLine = br.readLine()) != null) {
// 				response.append(inputLine);
// 			}
			
// 			br.close();

// 			//중간 체크
// 			System.out.println(response);
			
// 			JSONTokener tokener = new JSONTokener(response.toString());
// 			JSONObject object = new JSONObject(tokener);			
// 			JSONArray arr = object.getJSONArray("addresses");
// 			String result="";

// 			for (Object object2 : arr) {
// 				System.out.println(object2);
// 			}

// 			for (int i = 0; i < arr.length(); i++) {
// 				JSONObject temp = (JSONObject) arr.get(i);
// 				System.out.println("address : " + temp.get("roadAddress"));
// 				System.out.println("jibunAddress : " + temp.get("jibunAddress"));
// 				System.out.println("위도 : " + temp.get("y"));
// 				System.out.println("경도 : " + temp.get("x"));
// 				result+="address : " + temp.get("roadAddress") + " ";
// 				result += "jibunAddress : " + temp.get("jibunAddress")+ " ";
// 				result += "위도 : " + temp.get("y")+ " ";
// 				result += "경도 : " + temp.get("x")+ " ";
// 				result +="\n";

// 			}
			
// 			// JSON.simple 사용한 경우 아래와 같이 진행.
// 			/*JSONParser jpr = new JSONParser();
// 			JSONObject jarr = (JSONObject) jpr.parse(response.toString());
// 			JSONArray arr2 = (JSONArray) jarr.get("addresses");
			
// 			for (int i = 0; i < arr2.length(); i++) {
// 				JSONObject temp = (JSONObject) arr.get(i);
// 				System.out.println("address : " + temp.get("roadAddress"));
// 				System.out.println("jibunAddress : " + temp.get("jibunAddress"));
// 				System.out.println("위도 : " + temp.get("y"));
// 				System.out.println("경도 : " + temp.get("x"));
// 			}*/
//             return result + "\n" + arr.toString();
		
// 		} catch (Exception  e) {
// 			System.out.println(e);
// 		}
//         return "실패";
// 	}
    
// }
