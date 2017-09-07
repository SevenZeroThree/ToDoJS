"""Test cases for ToDoJS."""

import unittest
from selenium import webdriver


class ToDoJSTest(unittest.TestCase):
    """Test cases for ToDoJS."""
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        self.driver.get("https://christophertobin.github.io/ToDoJS/")

    def test_jquery_todo(self):
        """Test cases for jQuery implementation."""
        driver = self.driver

        jquery_element = driver.find_element_by_xpath("/html/body/section/section[1]/h3/a")
        self.assertEqual("jQuery", jquery_element.text)
        jquery_element.click()
        h1_element = driver.find_elements_by_tag_name("h1")[0]
        self.assertEqual("ToDo by jQuery", h1_element.text)
        self.__todos_test()

    def test_javascript_todo(self):
        """Test cases for JavaScript implementation."""
        driver = self.driver

        javascript_element = driver.find_element_by_xpath("/html/body/section/section[2]/h3/a")
        self.assertEqual("JavaScript", javascript_element.text)
        javascript_element.click()
        self.__todos_test()

    def tearDown(self):
        self.driver.close()

    def __todos_test(self):
        driver = self.driver

        todo_textbox = driver.find_element_by_id("new-todo")
        add_todo_button = driver.find_element_by_id("add-todo")

        todo_textbox.send_keys("Get water")
        add_todo_button.click()

        todo_textbox.send_keys("Get gas")
        add_todo_button.click()

        todo_textbox.send_keys("Get food")
        add_todo_button.click()

        in_progress_todo = driver.find_element_by_css_selector("#in-progress-todos li")
        self.assertEqual("Get water", in_progress_todo.text)
        in_progress_todo.click()

        completed_todo = driver.find_element_by_css_selector("#completed-todos li:nth-child(1)")
        self.assertEqual("Get water", completed_todo.text)

        in_progress_todo = driver.find_element_by_css_selector("#in-progress-todos li")
        self.assertEqual("Get gas", in_progress_todo.text)
        in_progress_todo.click()

        completed_todo = driver.find_element_by_css_selector("#completed-todos li:nth-child(2)")
        self.assertEqual("Get gas", completed_todo.text)

        in_progress_todo = driver.find_element_by_css_selector("#in-progress-todos li")
        self.assertEqual("Get food", in_progress_todo.text)
        in_progress_todo.click()

        completed_todo = driver.find_element_by_css_selector("#completed-todos li:nth-child(3)")
        self.assertEqual("Get food", completed_todo.text)

        reset_button = driver.find_element_by_id("reset-button")
        reset_button.click()

if __name__ == "__main__":
    unittest.main()
