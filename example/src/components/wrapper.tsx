import { Text, View, type ViewProps } from 'react-native';

interface WrapperProps extends ViewProps {
  title?: string;
}

export const Wrapper = (props: WrapperProps) => {
  const { title, ...rest } = props;

  return (
    <View
      style={{
        paddingBottom: 24,
        borderBottomColor: 'rgba(0,0,0,.1)',
        borderBottomWidth: 1,
        marginBottom: 32,
      }}
    >
      {title && (
        <Text
          style={{
            height: 44,
            color: '#fff',
            backgroundColor: '#8A72FB',
            textAlign: 'center',
            paddingTop: 8,
            marginHorizontal: 16,
            marginBottom: 16,
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          {title}
        </Text>
      )}
      <View {...rest} />
    </View>
  );
};
