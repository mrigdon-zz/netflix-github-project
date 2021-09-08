import React, { ChangeEvent } from "react";
import styles from "../styles/OrgSearchInput.module.css";
import debounce from "../utils/debounce";
import { label, LocaleContext } from "../utils/i18n";

const examples = [
  "netflix",
  "facebook",
  "linkedin",
  "apple",
  "google",
  "microsoft",
  "salesforce",
  "stripe",
  "paypal",
  "airbnb",
];

export default class OrgSearchInput extends React.Component<{
  loading?: boolean;
  onSearch(text: string): void;
}> {
  static contextType = LocaleContext;

  state = { exampleIndex: 0, searchText: "" };

  private intervalId?: NodeJS.Timer;

  private get placeholder() {
    return label(this.context.locale, "searchForOrgs", {
      example: examples[this.state.exampleIndex],
      className: styles.example,
    });
  }

  componentDidMount() {
    this.setExampleInterval();
  }

  componentWillUnmount() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  render() {
    const { placeholder } = this;
    return (
      <div className={styles.inputContainer}>
        <input
          aria-label={placeholder}
          className={styles.input}
          value={this.state.searchText}
          onChange={this.handleChangeSearch}
        />

        <span
          className={styles.placeholder}
          dangerouslySetInnerHTML={{ __html: placeholder }}
        ></span>

        {this.props.loading && <span className={styles.spinner}>⚙︎</span>}
      </div>
    );
  }

  private setExampleInterval() {
    this.intervalId = setInterval(() => {
      let newIndex = this.state.exampleIndex + 1;
      if (newIndex === examples.length) newIndex = 0;
      this.setState({ exampleIndex: newIndex });
    }, 3000);
  }

  private handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: event.target.value });
    this.search(event.target.value);
  };

  private search = debounce(async (text: string) => {
    this.props.onSearch(text);
  }, 1000);
}
