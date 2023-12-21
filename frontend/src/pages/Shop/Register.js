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

const RegisterPage = () => {

    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password !== repassword) {
            setError('パスワードと確認用パスワードが一致しません。');
            return;
        } else {
            setError('');
        }
    
        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: userid,
                    password: password,
                }),
            });
    
            if (response.ok) {
                console.log("登録成功");
            } else {
                setError('登録に失敗しました。');
            }
        } catch (error) {
            console.error('登録エラー', error);
            setError('登録に失敗しました。');
        }
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
                    <Heading mx='auto'>Shop新規登録</Heading>
                    <FormControl id="userid">
                        <FormLabel>ID</FormLabel>
                        <Input type="userid" value={userid} onChange={(e) => setUserid(e.target.value)}/>
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>パスワード</FormLabel>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </FormControl>
                    <FormControl id="repassword">
                        <FormLabel>確認用パスワード</FormLabel>
                        <Input type="password" value={repassword} onChange={(e) => setRepassword(e.target.value)}/>
                    </FormControl>
                    <Stack spacing={4}>
                        <Button type='submit'
                            bg={'#48BB78'}
                            color={'white'}
                            _hover={{
                                bg: '#38A169',
                            }}>
                            登録
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

export default RegisterPage;
