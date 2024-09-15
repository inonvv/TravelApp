import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import Layout from "../components/Layout"; // Import Layout component
import { Card, Title, Paragraph, Button, Avatar } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="lightbulb" />;

const MoreDetailsScreen = () => {
  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.card}>
          <Card.Title title="Card 1" subtitle="Subtitle 1" left={LeftContent} />
          <Card.Content>
            <Title>Card Title 1</Title>
            <Paragraph>This is some example content for card 1.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
        <Card style={styles.card}>
          <Card.Title title="Card 1" subtitle="Subtitle 1" left={LeftContent} />
          <Card.Content>
            <Title>Card Title 1</Title>
            <Paragraph>This is some example content for card 1.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
        <Card style={styles.card}>
          <Card.Title title="Card 1" subtitle="Subtitle 1" left={LeftContent} />
          <Card.Content>
            <Title>Card Title 1</Title>
            <Paragraph>This is some example content for card 1.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
        <Card style={styles.card}>
          <Card.Title title="Card 1" subtitle="Subtitle 1" left={LeftContent} />
          <Card.Content>
            <Title>Card Title 1</Title>
            <Paragraph>This is some example content for card 1.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </Layout>
  );
};

export default MoreDetailsScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
  },
});
