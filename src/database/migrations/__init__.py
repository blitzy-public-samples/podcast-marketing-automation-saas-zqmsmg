"""
Initializes the database migrations module and provides convenient imports for migration-related components.
"""

from src.database.migrations.0001_initial import *

# Human tasks:
# TODO: Review and confirm the structure of the migrations module and its contents
# TODO: Decide on any specific migration components that should be imported and exposed at the top level of the migrations module
# TODO (Optional): Implement a mechanism to automatically discover and import all migration files in the directory

# Note: The following is a placeholder for automatic migration discovery.
# Uncomment and implement if decided to use this approach.

# import os
# import importlib
#
# def import_migrations():
#     migrations_dir = os.path.dirname(__file__)
#     for filename in sorted(os.listdir(migrations_dir)):
#         if filename.endswith('.py') and filename != '__init__.py':
#             module_name = f"src.database.migrations.{filename[:-3]}"
#             module = importlib.import_module(module_name)
#             globals().update({name: getattr(module, name) for name in dir(module) if not name.startswith('_')})
#
# import_migrations()