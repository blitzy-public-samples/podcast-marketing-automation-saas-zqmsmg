from typing import List, Any
from src.database.utils import connection  # Assuming this module exists and provides database connection functionality

class QueryBuilder:
    """A class for building SQL queries programmatically"""

    def __init__(self):
        """Initializes a new QueryBuilder instance"""
        self._table: str = ""
        self._select_columns: List[str] = []
        self._where_conditions: List[str] = []
        self._order_by: List[str] = []
        self._limit: int = 0
        self._offset: int = 0

    def table(self, table_name: str) -> 'QueryBuilder':
        """Sets the table name for the query"""
        self._table = table_name
        return self

    def select(self, columns: List[str]) -> 'QueryBuilder':
        """Specifies the columns to be selected in the query"""
        self._select_columns.extend(columns)
        return self

    def where(self, condition: str) -> 'QueryBuilder':
        """Adds a WHERE condition to the query"""
        self._where_conditions.append(condition)
        return self

    def order_by(self, column: str, direction: str = 'ASC') -> 'QueryBuilder':
        """Specifies the ORDER BY clause for the query"""
        self._order_by.append(f"{column} {direction}")
        return self

    def limit(self, limit: int) -> 'QueryBuilder':
        """Sets the LIMIT clause for the query"""
        self._limit = limit
        return self

    def offset(self, offset: int) -> 'QueryBuilder':
        """Sets the OFFSET clause for the query"""
        self._offset = offset
        return self

    def build(self) -> str:
        """Builds and returns the final SQL query string"""
        query_parts = []

        # SELECT clause
        select_clause = "SELECT " + (", ".join(self._select_columns) if self._select_columns else "*")
        query_parts.append(select_clause)

        # FROM clause
        query_parts.append(f"FROM {self._table}")

        # WHERE clause
        if self._where_conditions:
            query_parts.append("WHERE " + " AND ".join(self._where_conditions))

        # ORDER BY clause
        if self._order_by:
            query_parts.append("ORDER BY " + ", ".join(self._order_by))

        # LIMIT clause
        if self._limit > 0:
            query_parts.append(f"LIMIT {self._limit}")

        # OFFSET clause
        if self._offset > 0:
            query_parts.append(f"OFFSET {self._offset}")

        return " ".join(query_parts)

    def execute(self) -> List[Any]:
        """Executes the built query and returns the results"""
        query = self.build()
        # Assuming the connection module provides a method to execute queries
        return connection.execute_query(query)

# TODO: Implement proper SQL injection prevention measures in the query building process
# TODO: Add support for JOIN operations in the QueryBuilder class
# TODO: Implement a method to add parameters for prepared statements