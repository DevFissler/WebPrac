<%@ page contentType="text/html; charset=utf-8" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>입력 정보 확인</title>
    <%
    
    request.setCharacterEncoding("UTF-8");
    
    String [] arr =  request.getParameterValues("member");
    String id = request.getParameter("id");
    String pw = request.getParameter("pw");
    String name= request.getParameter("name");
    String provider = request.getParameter("provider");
    String firstNum = request.getParameter("firstNum");
    int middleNum = Integer.parseInt(request.getParameter("mNum"));
    int lastNum = Integer.parseInt(request.getParameter("lNum"));
    String email = request.getParameter("email");
    %>
</head>
<body>
    <%  
    
        out.print("<h2>회원 가입 정보</h2>");
        
        for(int i=0;i<arr.length;i++){
            out.print("회원유형: "+arr[i]+"<br><br>");
        }
        out.print("아이디 : "+ id+"<br><br>");
        out.print("이름 : "+ name+"<br><br>");
        out.print("휴대전화번호 : ("+ provider + ") "+firstNum+" - "+middleNum+" - "+lastNum+"<br><br>");
        out.print("이메일 : "+ email);
    %>
</body>
</html>