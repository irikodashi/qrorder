import React, {useState} from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Heading,
    FormErrorMessage,
} from '@chakra-ui/react';

const LoginPage = () => {

    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (userid === "") {
            setError('IDを入力してください。');
            return;
        } else if (password === "") {
            setError('パスワードを入力してください。');
            return;
        } else {
            setError('');
        }

        // ここでサーバーへの登録処理を行う
        console.log("ID: ", userid, "Password: ", password);
    };

    return (
        <Box
            w={['full', 'md']}
            p={[8, 10]}
            shadow='md'
            borderWidth='1px'
            mx='auto'
            mt={[20, '10vh']}
        >
            <form onSubmit={handleSubmit}>
                <Stack spacing={6} w={'full'} maxW={'md'}>
                    <Heading mx='auto'>ログイン</Heading>
                    <FormControl id="userid">
                        <FormLabel>ID</FormLabel>
                        <Input type="userid" value={userid} onChange={(e) => setUserid(e.target.value)}/>
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>パスワード</FormLabel>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </FormControl>
                    <Stack spacing={4}>
                        <Button type='submit'
                            bgGradient={'linear(to-r, teal.500, green.500)'}
                            color={'white'}
                            _hover={{
                                bgGradient: 'linear(to-l, #7928CA, #FF0080)',
                            }}>
                            ログイン
                        </Button>
                        <FormControl isInvalid={error !== ''}>
                            {error && <FormErrorMessage>{error}</FormErrorMessage>}
                        </FormControl>
                    </Stack>
                </Stack>
            </form>
        </Box>
    );
};

export default LoginPage;
