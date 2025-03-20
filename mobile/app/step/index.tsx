import { 
    View,
    Text,
    StyleSheet, 
    Pressable, 
    ScrollView,
    TextInput, // Importando o TextInput do React Native
} from 'react-native';
import { colors } from '../../constants/colors';
import { Header } from '../../components/header';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form'; // Usando Controller diretamente
import { router } from 'expo-router'
import { useDataStore} from '../../store/data'



// Definição do esquema de validação com zod
const schema = z.object({
    name: z.string().min(1, { message: "O nome é obrigatório" }),
    weight: z.string().min(1, { message: "O peso é obrigatório" }),
    age: z.string().min(1, { message: "A idade é obrigatória" }),
    height: z.string().min(1, { message: "A altura é obrigatória" }),
});

type FormData = z.infer<typeof schema>;

export default function Step() {
    // Inicializando o react-hook-form com a validação via zod
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    const setPageOne = useDataStore(state => state.setPageOne)



    // Função que é chamada ao submeter o formulário
    function handleCreate(data: FormData) {
        console.log("PASSANDO DADOS DA PÁGINA 1");
        
        setPageOne({
            name: data.name,
            weight: data.weight,
            age: data.age,
            height: data.height
        })

        router.push("/create")
    }

    return (
        <View style={styles.container}>
            <Header
                step="passo 1"
                title="Vamos começar"
            />

            <ScrollView style={styles.content}>
                {/* Nome */}
                <Text style={styles.label}>Nome:</Text>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.name && styles.errorInput]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Digite o seu nome..."
                            keyboardType="default"
                        />
                    )}
                />
                {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

                {/* Peso */}
                <Text style={styles.label}>Seu peso atual:</Text>
                <Controller
                    control={control}
                    name="weight"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.weight && styles.errorInput]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Ex: 75..."
                            keyboardType="numeric"
                        />
                    )}
                />
                {errors.weight && <Text style={styles.errorText}>{errors.weight.message}</Text>}

                {/* Altura */}
                <Text style={styles.label}>Sua altura atual:</Text>
                <Controller
                    control={control}
                    name="height"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.height && styles.errorInput]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Ex: 1.90"
                            keyboardType="numeric"
                        />
                    )}
                />
                {errors.height && <Text style={styles.errorText}>{errors.height.message}</Text>}

                {/* Idade */}
                <Text style={styles.label}>Sua idade atual:</Text>
                <Controller
                    control={control}
                    name="age"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.age && styles.errorInput]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Ex: 25"
                            keyboardType="numeric"
                        />
                    )}
                />
                {errors.age && <Text style={styles.errorText}>{errors.age.message}</Text>}

                {/* Botão de Submit */}
                <Pressable 
                    style={styles.button} 
                    onPress={handleSubmit(handleCreate)}
                >
                    <Text style={styles.buttonText}>Avançar</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    label: {
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 8,
        paddingHorizontal: 10,
        borderRadius: 4,
        backgroundColor: 'white',
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: -6,
        marginBottom: 8,
    },
    button: {
        backgroundColor: colors.blue,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
