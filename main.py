# main.py
import os

import pymysql
from flask import render_template,request #新增request請求(下方用到)
from flask import Flask


app = Flask(__name__)
# env_config = os.getenv( "PROD_APP_SETTINGS" , "config.DevelopmentConfig" )
# app.config.from_object(env_config)

conn = pymysql.connect(
    host='120.126.134.8',
    user='admin',
    password='g34552',
    db='web',
    charset='utf8',
    port=3305

)

@app.route('/DatabasePlatform.html')
def index():
    cur = conn.cursor()

    sql = "select * from iframe where page_type='campus'"
    cur.execute(sql)
    content = cur.fetchall()

    sql2="select * from iframe where page_type='open'"
    cur.execute(sql2)
    content_open=cur.fetchall()
    return render_template('DatabasePlatform.html',content=content,content_open=content_open)


@app.route('/looker_campus.html')
def page_compus():
    cur = conn.cursor()

    sql = "select * from iframe where page_type='campus'"
    cur.execute(sql)
    content = cur.fetchall()

    sql2="select * from iframe where page_type='open'"
    cur.execute(sql2)
    content_open=cur.fetchall()

    # result=[]
    # for row in content:
    #     result.append(dict(zip([column[0] for column in cur.description],row)))
    #     json_data=json.dumps(result)
    # json_data1 = json_data.encode('utf-8').decode('unicode_escape')
    # print(json_data1)

    return render_template('looker_campus.html',content=content,content_open=content_open)



@app.route('/looker_open.html')
def page_open():
    cur = conn.cursor()

    sql = "select * from iframe where page_type='campus'"
    cur.execute(sql)
    content = cur.fetchall()

    sql2="select * from iframe where page_type='open'"
    cur.execute(sql2)
    content_open=cur.fetchall()
    return render_template('looker_open.html',content=content,content_open=content_open)



if __name__ == "__main__":
    # https://www.youtube.com/watch?v=AiUzsr5JZgQ
    # from gevent import pywsgi
    # server = pywsgi.WSGIServer(('0.0.0.0',5000),app)
    # server.serve_forever()
    app.run('0.0.0.0',debug=True)
