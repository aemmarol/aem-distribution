import { Button, Card, Form, Input, message, Spin } from "antd";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { login } from "./api/login";

export default function Login() {
  const [loginForm] = Form.useForm();
  const router = useRouter();

  const [showLoader, setshowLoader] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      router.push("/list");
    }
  }, []);

  const onFinish = async (values) => {
    setshowLoader(true);
    const loginResult = await login(values.its);
    if (loginResult.type === "success") {
      loginForm.resetFields();
      localStorage.setItem("user", JSON.stringify(loginResult.data));
      setshowLoader(false);
      router.push("/list");
    } else {
      message.error(loginResult.msg);
      setshowLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="w-full p-4 min-h-screen overflow-y-auto bg-gray-300 flex items-center justify-center">
      <Head>
        <title>AEM Distribution</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showLoader ? (
        <div className="fixed z-50 top-0 left-0 w-screen h-screen bg-white/70 flex items-center justify-center">
          <Spin size="large" />
        </div>
      ) : null}

      <Card className="w-full rounded-lg md:max-w-md">
        <div className="w-full flex justify-center mb-4">
          <Image src="/jamaatLogo.png" alt="logo" width={150} height={150} />
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          form={loginForm}
        >
          <Form.Item
            label="ITS"
            name="its"
            rules={[
              {
                required: true,
                message: "Please input your its!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
